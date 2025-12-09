const FS = require("node:fs");

const lines = FS.readFileSync("day03-input.txt", "utf-8");
const data = lines
  .split("\n")
  .map((str) => str.split(""))
  .filter((a) => a.length);

console.log(data);

let result = 0;
for (const bank of data) {
  const len = bank.length;
  let d1 = bank.slice(0, -1).reduce((a, b) => (a > b ? a : b));
  let d1Pos = bank.indexOf(d1);
  const d2 = Math.max(...bank.slice(d1Pos + 1));
  result += parseInt(d1) * 10 + parseInt(d2);
}

console.log(result);
