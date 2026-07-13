#!/usr/bin/env bash
# Validates psychordle puzzle data integrity across ALL puzzle data files
# (puzzles.js plus any puzzles-batch*.js files that CASES.<tier>.push() more
# puzzles at load time).
# Usage: bash validate-puzzles.sh [file1.js file2.js ...]
#   With no args, auto-globs puzzles.js and puzzles-batch*.js in this script's directory.
# No node/python required — pure bash + awk.

set -u
DIR="$(dirname "$0")"
FAIL=0

if [ "$#" -gt 0 ]; then
  FILES=("$@")
else
  FILES=("$DIR"/puzzles.js "$DIR"/puzzles-batch*.js)
fi

# Drop any glob that didn't match an actual file
EXISTING=()
for f in "${FILES[@]}"; do
  [ -f "$f" ] && EXISTING+=("$f")
done
FILES=("${EXISTING[@]}")

if [ "${#FILES[@]}" -eq 0 ]; then
  echo "No puzzle data files found."
  exit 1
fi

echo "Validating: ${FILES[*]}"
echo "================================================"

# Tier markers recognized in either the base file (  easy: [ ) or a batch
# file (CASES.easy.push( ). Same regex family is reused by every check below.
TIER_AWK_PRELUDE='
  /^  easy: \[/ || /^CASES\.easy\.push\(/ { arrTier="easy" }
  /^  medium: \[/ || /^CASES\.medium\.push\(/ { arrTier="medium" }
  /^  hard: \[/ || /^CASES\.hard\.push\(/ { arrTier="hard" }
'

# 1. Brace / bracket balance (per file, since each file must be independently well-formed)
echo "[1] Brace/bracket balance per file:"
BAL_FAIL=0
for f in "${FILES[@]}"; do
  BAL=$(awk '
  {
    n = length($0)
    for (i=1;i<=n;i++) {
      c = substr($0,i,1)
      if (c=="{") ob++
      else if (c=="}") cb++
      else if (c=="[") osq++
      else if (c=="]") csq++
      else if (c=="(") op++
      else if (c==")") cp++
    }
  }
  END { printf "%d %d %d %d %d %d", ob, cb, osq, csq, op, cp }
  ' "$f")
  read -r OB CB OSQ CSQ OP CP <<< "$BAL"
  if [ "$OB" != "$CB" ] || [ "$OSQ" != "$CSQ" ] || [ "$OP" != "$CP" ]; then
    echo "    FAIL ($f): { $OB/$CB }  [ $OSQ/$CSQ ]  ( $OP/$CP )"
    BAL_FAIL=1
  else
    echo "    OK ($f): { $OB } [ $OSQ ] ( $OP )"
  fi
done
[ "$BAL_FAIL" -eq 1 ] && FAIL=1
echo

# 2. Unescaped double-quote check inside strings (a quote with a letter on both sides, not preceded by a backslash)
echo "[2] Unescaped inner quotes:"
BADQUOTES=$(grep -nE '[a-zA-Z]"[a-zA-Z]' "${FILES[@]}")
if [ -n "$BADQUOTES" ]; then
  echo "    FAIL: found unescaped quote(s):"
  echo "$BADQUOTES" | sed 's/^/    /'
  FAIL=1
else
  echo "    OK (none found)"
fi
echo

# 3. Duplicate ids (across ALL files combined)
echo "[3] Duplicate ids (across all files):"
DUPIDS=$(grep -ho 'id:"[a-zA-Z0-9-]*"' "${FILES[@]}" | sort | uniq -d)
if [ -n "$DUPIDS" ]; then
  echo "    FAIL: duplicate id(s) found:"
  echo "$DUPIDS" | sed 's/^/    /'
  FAIL=1
else
  echo "    OK (none found)"
fi
echo

# 4. id prefix matches its containing tier, and clue count matches MAX[tier] (easy=5, medium=6, hard=7)
echo "[4] Tier consistency (id prefix) + clue count per puzzle:"
TIER_MISMATCH=$(cat "${FILES[@]}" | awk "$TIER_AWK_PRELUDE"'
/^    \{$/ { id=""; idTier=""; inclues=0; n=0 }
/id:"/ {
  match($0, /id:"([a-zA-Z0-9-]*)"/, arr); id=arr[1]
  if (id ~ /^easy-/) idTier="easy"
  else if (id ~ /^med-/) idTier="medium"
  else if (id ~ /^hard-/) idTier="hard"
  else idTier="UNKNOWN"
  if (idTier != arrTier) print "MISMATCH " id " is in " arrTier " section but id prefix implies " idTier
}
')
if [ -n "$TIER_MISMATCH" ]; then
  echo "    FAIL:"
  echo "$TIER_MISMATCH" | sed 's/^/    /'
  FAIL=1
else
  echo "    OK: every id prefix matches its containing tier section"
fi

CLUE_MISMATCH=$(cat "${FILES[@]}" | awk "$TIER_AWK_PRELUDE"'
/^    \{$/ { id=""; inclues=0; n=0 }
/id:"/ { match($0, /id:"([a-zA-Z0-9-]*)"/, arr); id=arr[1] }
/clues:\[/ { inclues=1; n=0; next }
inclues && /^      \],$/ {
  inclues=0
  want=5
  if (arrTier=="medium") want=6
  if (arrTier=="hard") want=7
  if (n!=want) print id " (" arrTier "): expected " want " clues, found " n
  next
}
inclues && /^        "/ { n++ }
')
if [ -n "$CLUE_MISMATCH" ]; then
  echo "    FAIL: clue-count mismatches:"
  echo "$CLUE_MISMATCH" | sed 's/^/    /'
  FAIL=1
else
  echo "    OK: every puzzle has the right clue count for its tier"
fi
echo

# 5. Duplicate dates within the same tier (across ALL files combined — each tier should have at most one puzzle per date)
echo "[5] Duplicate dates within a tier (across all files):"
DUPDATES=$(cat "${FILES[@]}" | awk "$TIER_AWK_PRELUDE"'
/date:"[0-9-]*"/ { match($0, /date:"([0-9-]*)"/, arr); print arrTier " " arr[1] }
' | sort | uniq -c | awk '$1>1{print}')
if [ -n "$DUPDATES" ]; then
  echo "    FAIL: duplicate tier+date combos (count, tier, date):"
  echo "$DUPDATES" | sed 's/^/    /'
  FAIL=1
else
  echo "    OK: no duplicate dates within any tier"
fi
echo

# 6. Every puzzle's `answer` normalizes to something in the DIAGNOSES pool (mirrors main.js's norm()/isValidGuess())
#    DIAGNOSES itself is only ever defined in the base puzzles.js, but this scans all files for `answer:` occurrences.
echo "[6] Answers exist in DIAGNOSES pool:"
BAD_ANSWERS=$(cat "${FILES[@]}" | awk '
function norm(s,   out) {
  out = tolower(s)
  gsub(/\([^)]*\)/, "", out)
  gsub(/[^a-z0-9 ]/, " ", out)
  gsub(/\<disorder\>/, "", out)
  gsub(/[ \t]+/, " ", out)
  gsub(/^ +| +$/, "", out)
  return out
}
/^const DIAGNOSES = \[/ { indiag=1; next }
indiag && /^\];/ { indiag=0; next }
indiag {
  n = split($0, parts, "\"")
  for (i=2; i<=n; i+=2) {
    if (parts[i] != "" && parts[i] !~ /^ *$/) diagSet[norm(parts[i])] = 1
  }
}
/answer:"/ {
  match($0, /answer:"([^"]*)"/, arr)
  a = arr[1]
  key = norm(a)
  if (!(key in diagSet)) print "NOT FOUND: \"" a "\" (normalized: \"" key "\")"
}
')
if [ -n "$BAD_ANSWERS" ]; then
  echo "    FAIL: answer(s) not found in DIAGNOSES pool:"
  echo "$BAD_ANSWERS" | sed 's/^/    /'
  FAIL=1
else
  echo "    OK: every answer matches an entry in DIAGNOSES"
fi
echo

# 7. Summary counts
echo "[7] Puzzle counts per tier (across all files):"
cat "${FILES[@]}" | awk "$TIER_AWK_PRELUDE"'
/^    \{$/ { count[arrTier]++ }
END {
  print "    easy:   " count["easy"]
  print "    medium: " count["medium"]
  print "    hard:   " count["hard"]
  print "    total:  " (count["easy"]+count["medium"]+count["hard"])
}
'
echo

echo "================================================"
if [ "$FAIL" -eq 0 ]; then
  echo "ALL CHECKS PASSED"
else
  echo "SOME CHECKS FAILED (see above)"
fi
exit $FAIL
