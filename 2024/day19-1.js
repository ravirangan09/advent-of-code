const FS = require("node:fs");

const data = FS.readFileSync("day19-input.txt", "utf-8");

const [patternStr, ...lines] = data.split("\n").filter((l) => l.length);
const patterns = patternStr.split(", ");

//https://github.com/shahata/adventofcode-solver/blob/master/src/2024/day19.js
const matchCount = (line, patterns, memo) => {
  let match = 0;
  if (line.length == 0) return 1; //match
  if (line in memo) return memo[line];
  for (const pattern of patterns) {
    if (line.startsWith(pattern)) {
      match += matchCount(line.slice(pattern.length), patterns, memo);
    }
  }
  memo[line] = match;
  return match;
};

const memo = {};
const result = lines.reduce(
  (a, l) => a + (matchCount(l, patterns, memo) > 0 ? 1 : 0),
  0
);
console.log(result);
