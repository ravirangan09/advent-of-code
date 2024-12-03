const FS = require("node:fs");

const data = FS.readFileSync("day03-input.txt", "utf-8");
console.log(data);
const searchExp = /mul\(\d{1,3},\d{1,3}\)/g;
const mulExp = /mul\((\d{1,3}),(\d{1,3})\)/;

const allMatches = data.matchAll(searchExp);
let sum = 0;
for (const str of allMatches) {
  const m = str[0].match(mulExp);
  const vals = m.slice(1).map((s) => parseInt(s));
  sum += vals[0] * vals[1];
}
console.log(sum);
