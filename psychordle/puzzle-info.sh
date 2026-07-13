#!/usr/bin/env bash
# Prints everything needed to plan a new batch of puzzles:
#   - the latest release date per tier (so new dates can continue from there)
#   - every answer currently used per tier (to avoid/allow repeats)
#   - every diagnosis in the DIAGNOSES pool NOT yet used in a given tier
#   - overall counts
# Usage: bash puzzle-info.sh [path-to-puzzles.js]
# No node/python required — pure bash + awk.

set -u
FILE="${1:-$(dirname "$0")/puzzles.js}"

if [ ! -f "$FILE" ]; then
  echo "File not found: $FILE"
  exit 1
fi

echo "Puzzle info for $FILE"
echo "================================================"
echo

# ---- Latest (and earliest) date per tier ----
echo "[Date ranges per tier]"
awk '
/^  easy: \[/ { t="easy" }
/^  medium: \[/ { t="medium" }
/^  hard: \[/ { t="hard" }
/date:"[0-9-]*"/ {
  match($0, /date:"([0-9-]*)"/, a); d=a[1]
  if (min[t]=="" || d<min[t]) min[t]=d
  if (max[t]=="" || d>max[t]) max[t]=d
}
END {
  for (t in max) print "  " t ": " min[t] " .. " max[t]
}
' "$FILE" | sort
echo

# ---- Puzzle counts per tier ----
echo "[Puzzle counts per tier]"
awk '
/^  easy: \[/ { t="easy" }
/^  medium: \[/ { t="medium" }
/^  hard: \[/ { t="hard" }
/^    \{$/ { count[t]++ }
END {
  print "  easy:   " count["easy"]
  print "  medium: " count["medium"]
  print "  hard:   " count["hard"]
  print "  total:  " (count["easy"]+count["medium"]+count["hard"])
}
' "$FILE"
echo

# ---- All answers currently used, grouped by tier ----
for T in easy medium hard; do
  echo "[Answers currently used — $T tier]"
  awk -v want="$T" '
  /^  easy: \[/ { t="easy" }
  /^  medium: \[/ { t="medium" }
  /^  hard: \[/ { t="hard" }
  /answer:"/ { match($0, /answer:"([^"]*)"/, a); if (t==want) print "  - " a[1] }
  ' "$FILE"
  echo
done

# ---- Full DIAGNOSES pool, and which entries are unused in each tier ----
echo "[Full DIAGNOSES pool]"
awk '
/^const DIAGNOSES = \[/ { indiag=1; next }
indiag && /^\];/ { indiag=0; next }
indiag {
  n = split($0, parts, "\"")
  for (i=2; i<=n; i+=2) {
    if (parts[i] != "" && parts[i] !~ /^ *$/) print "  - " parts[i]
  }
}
' "$FILE"
echo

for T in easy medium hard; do
  echo "[DIAGNOSES pool entries NOT YET used in $T tier]"
  awk -v want="$T" '
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
  /^  easy: \[/ { t="easy" }
  /^  medium: \[/ { t="medium" }
  /^  hard: \[/ { t="hard" }
  /answer:"/ { match($0, /answer:"([^"]*)"/, a); if (t==want) usedNorm[norm(a[1])]=1 }
  END {
    for (i=1; i<=nd; i++) {
      if (!(norm(diagList[i]) in usedNorm)) print "  - " diagList[i]
    }
  }
  ' "$FILE"
  echo
done

echo "================================================"
echo "Reminder: repeating a diagnosis within the same tier (with a fresh vignette/clues) is fine."
echo "Reminder: MAX clues per tier — easy:5, medium:6, hard:7 (see MAX const in puzzles.js)."
