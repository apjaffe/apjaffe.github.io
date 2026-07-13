#!/usr/bin/env bash
# Prints everything needed to plan a new batch of puzzles, across ALL puzzle
# data files (puzzles.js plus any puzzles-batch*.js files):
#   - the latest release date per tier (so new dates can continue from there)
#   - every answer currently used per tier (to avoid/allow repeats)
#   - every diagnosis in the DIAGNOSES pool NOT yet used in a given tier
#   - overall counts
# Usage: bash puzzle-info.sh [file1.js file2.js ...]
#   With no args, auto-globs puzzles.js and puzzles-batch*.js in this script's directory.
# No node/python required — pure bash + awk.

set -u
DIR="$(dirname "$0")"

if [ "$#" -gt 0 ]; then
  FILES=("$@")
else
  FILES=("$DIR"/puzzles.js "$DIR"/puzzles-batch*.js)
fi

EXISTING=()
for f in "${FILES[@]}"; do
  [ -f "$f" ] && EXISTING+=("$f")
done
FILES=("${EXISTING[@]}")

if [ "${#FILES[@]}" -eq 0 ]; then
  echo "No puzzle data files found."
  exit 1
fi

echo "Puzzle info for: ${FILES[*]}"
echo "================================================"
echo

TIER_AWK_PRELUDE='
  /^  easy: \[/ || /^CASES\.easy\.push\(/ { t="easy" }
  /^  medium: \[/ || /^CASES\.medium\.push\(/ { t="medium" }
  /^  hard: \[/ || /^CASES\.hard\.push\(/ { t="hard" }
'

# ---- Latest (and earliest) date per tier ----
echo "[Date ranges per tier]"
cat "${FILES[@]}" | awk "$TIER_AWK_PRELUDE"'
/date:"[0-9-]*"/ {
  match($0, /date:"([0-9-]*)"/, a); d=a[1]
  if (min[t]=="" || d<min[t]) min[t]=d
  if (max[t]=="" || d>max[t]) max[t]=d
}
END {
  for (t in max) print "  " t ": " min[t] " .. " max[t]
}
' | sort
echo

# ---- Puzzle counts per tier ----
echo "[Puzzle counts per tier]"
cat "${FILES[@]}" | awk "$TIER_AWK_PRELUDE"'
/^    \{$/ { count[t]++ }
END {
  print "  easy:   " count["easy"]
  print "  medium: " count["medium"]
  print "  hard:   " count["hard"]
  print "  total:  " (count["easy"]+count["medium"]+count["hard"])
}
'
echo

# ---- All answers currently used, grouped by tier ----
for T in easy medium hard; do
  echo "[Answers currently used — $T tier]"
  cat "${FILES[@]}" | awk -v want="$T" "$TIER_AWK_PRELUDE"'
  /answer:"/ { match($0, /answer:"([^"]*)"/, a); if (t==want) print "  - " a[1] }
  '
  echo
done

# ---- Full DIAGNOSES pool, and which entries are unused in each tier ----
echo "[Full DIAGNOSES pool]"
cat "${FILES[@]}" | awk '
/^const DIAGNOSES = \[/ { indiag=1; next }
indiag && /^\];/ { indiag=0; next }
indiag {
  n = split($0, parts, "\"")
  for (i=2; i<=n; i+=2) {
    if (parts[i] != "" && parts[i] !~ /^ *$/) print "  - " parts[i]
  }
}
'
echo

for T in easy medium hard; do
  echo "[DIAGNOSES pool entries NOT YET used in $T tier]"
  cat "${FILES[@]}" | awk -v want="$T" "$TIER_AWK_PRELUDE"'
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
      if (parts[i] != "" && parts[i] !~ /^ *$/) diagList[++nd] = parts[i]
    }
    next
  }
  /answer:"/ { match($0, /answer:"([^"]*)"/, a); if (t==want) usedNorm[norm(a[1])]=1 }
  END {
    for (i=1; i<=nd; i++) {
      if (!(norm(diagList[i]) in usedNorm)) print "  - " diagList[i]
    }
  }
  '
  echo
done

echo "================================================"
echo "Reminder: repeating a diagnosis within the same tier (with a fresh vignette/clues) is fine."
echo "Reminder: MAX clues per tier — easy:5, medium:6, hard:7 (see MAX const in puzzles.js)."
echo "Reminder: to add a new batch, write raw puzzle-object fragment files, then run:"
echo "  bash build-batch.sh puzzles-batchN.js --easy f1.js ... --medium f2.js ... --hard f3.js ..."
echo "  and add <script src=\"puzzles-batchN.js\"></script> to index.html after puzzles.js."
