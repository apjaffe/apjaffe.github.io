#!/usr/bin/env bash
# Validates psychordle/puzzles.js structural and content integrity.
# Usage: bash validate-puzzles.sh [path-to-puzzles.js]
# No node/python required — pure bash + awk.

set -u
FILE="${1:-$(dirname "$0")/puzzles.js}"
FAIL=0

if [ ! -f "$FILE" ]; then
  echo "File not found: $FILE"
  exit 1
fi

echo "Validating $FILE"
echo "================================================"

# 1. Brace / bracket balance
BAL=$(awk '
{
  n = length($0)
  for (i=1;i<=n;i++) {
    c = substr($0,i,1)
    if (c=="{") ob++
    else if (c=="}") cb++
    else if (c=="[") osq++
    else if (c=="]") csq++
  }
}
END { printf "%d %d %d %d", ob, cb, osq, csq }
' "$FILE")
read -r OB CB OSQ CSQ <<< "$BAL"
echo "[1] Brace balance:   { $OB  } $CB"
echo "[1] Bracket balance: [ $OSQ  ] $CSQ"
if [ "$OB" != "$CB" ] || [ "$OSQ" != "$CSQ" ]; then
  echo "    FAIL: mismatched braces/brackets"
  FAIL=1
else
  echo "    OK"
fi
echo

# 2. Unescaped double-quote check inside strings (a quote with a letter on both sides, not preceded by a backslash)
BADQUOTES=$(grep -nE '[a-zA-Z]"[a-zA-Z]' "$FILE")
echo "[2] Unescaped inner quotes:"
if [ -n "$BADQUOTES" ]; then
  echo "    FAIL: found unescaped quote(s):"
  echo "$BADQUOTES" | sed 's/^/    /'
  FAIL=1
else
  echo "    OK (none found)"
fi
echo

# 3. Duplicate ids (across the whole file)
DUPIDS=$(grep -o 'id:"[a-zA-Z0-9-]*"' "$FILE" | sort | uniq -d)
echo "[3] Duplicate ids:"
if [ -n "$DUPIDS" ]; then
  echo "    FAIL: duplicate id(s) found:"
  echo "$DUPIDS" | sed 's/^/    /'
  FAIL=1
else
  echo "    OK (none found)"
fi
echo

# 4. id prefix matches its containing tier array, and clue count matches MAX[tier] (easy=5, medium=6, hard=7)
echo "[4] Tier consistency (id prefix) + clue count per puzzle:"
TIER_MISMATCH=$(awk '
/^  easy: \[/ { arrTier="easy" }
/^  medium: \[/ { arrTier="medium" }
/^  hard: \[/ { arrTier="hard" }
/^    \{$/ { id=""; idTier=""; inclues=0; n=0 }
/id:"/ {
  match($0, /id:"([a-zA-Z0-9-]*)"/, arr); id=arr[1]
  if (id ~ /^easy-/) idTier="easy"
  else if (id ~ /^med-/) idTier="medium"
  else if (id ~ /^hard-/) idTier="hard"
  else idTier="UNKNOWN"
  if (idTier != arrTier) print "MISMATCH " id " is in " arrTier " array but id prefix implies " idTier
}
' "$FILE")
if [ -n "$TIER_MISMATCH" ]; then
  echo "    FAIL:"
  echo "$TIER_MISMATCH" | sed 's/^/    /'
  FAIL=1
else
  echo "    OK: every id prefix matches its containing array"
fi

CLUE_MISMATCH=$(awk '
/^  easy: \[/ { arrTier="easy" }
/^  medium: \[/ { arrTier="medium" }
/^  hard: \[/ { arrTier="hard" }
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
' "$FILE")
if [ -n "$CLUE_MISMATCH" ]; then
  echo "    FAIL: clue-count mismatches:"
  echo "$CLUE_MISMATCH" | sed 's/^/    /'
  FAIL=1
else
  echo "    OK: every puzzle has the right clue count for its tier"
fi
echo

# 5. Duplicate dates within the same tier (each tier should have at most one puzzle per date)
echo "[5] Duplicate dates within a tier:"
DUPDATES=$(awk '
/^  easy: \[/ { arrTier="easy" }
/^  medium: \[/ { arrTier="medium" }
/^  hard: \[/ { arrTier="hard" }
/date:"[0-9-]*"/ { match($0, /date:"([0-9-]*)"/, arr); print arrTier " " arr[1] }
' "$FILE" | sort | uniq -c | awk '$1>1{print}')
if [ -n "$DUPDATES" ]; then
  echo "    FAIL: duplicate tier+date combos (count, tier, date):"
  echo "$DUPDATES" | sed 's/^/    /'
  FAIL=1
else
  echo "    OK: no duplicate dates within any tier"
fi
echo

# 6. Every puzzle's `answer` normalizes to something in the DIAGNOSES pool (mirrors main.js's norm()/isValidGuess())
echo "[6] Answers exist in DIAGNOSES pool:"
BAD_ANSWERS=$(awk '
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
' "$FILE")
if [ -n "$BAD_ANSWERS" ]; then
  echo "    FAIL: answer(s) not found in DIAGNOSES pool:"
  echo "$BAD_ANSWERS" | sed 's/^/    /'
  FAIL=1
else
  echo "    OK: every answer matches an entry in DIAGNOSES"
fi
echo

# 7. Summary counts
echo "[7] Puzzle counts per tier:"
awk '
/^  easy: \[/ { arrTier="easy" }
/^  medium: \[/ { arrTier="medium" }
/^  hard: \[/ { arrTier="hard" }
/^    \{$/ { count[arrTier]++ }
END {
  print "    easy:   " count["easy"]
  print "    medium: " count["medium"]
  print "    hard:   " count["hard"]
  print "    total:  " (count["easy"]+count["medium"]+count["hard"])
}
' "$FILE"
echo

echo "================================================"
if [ "$FAIL" -eq 0 ]; then
  echo "ALL CHECKS PASSED"
else
  echo "SOME CHECKS FAILED (see above)"
fi
exit $FAIL
