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

let sum = 0;
for (let i = 0; i < col1.length; i++) {
  const count = col2.filter((v) => v == col1[i]).length;
  sum += col1[i] * count;
}

console.log(sum);
