const FS = require("node:fs");

const data = FS.readFileSync("day01-input.txt", "utf-8");
const rows = data
  .split("\n")
  .map((s) => s.split("  "))
  .filter((a) => a.length == 2)
  .map((as) => as.map((v) => parseInt(v)));

const col1 = [];
const col2 = [];

for (const r of rows) {
  col1.push(r[0]);
  col2.push(r[1]);
}
col1.sort((a, b) => a - b);
col2.sort((a, b) => a - b);
let diffSum = 0;
for (let i = 0; i < col1.length; i++) {
  diffSum += Math.abs(col1[i] - col2[i]);
}

console.log(diffSum);
