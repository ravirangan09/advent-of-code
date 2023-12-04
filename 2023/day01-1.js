const fs = require("fs");

const data = fs.readFileSync("day01-1-input.txt", "utf-8");
const lines = data.split("\n");
// console.log(lines.length, lines[0]);
let sum = 0;
for (const l of lines) {
  const digits = l.match(/\d/g);
  if (digits && digits.length) {
    const s = (digits.at(0) - "0") * 10 + (digits.at(-1) - "0");
    console.log(s);
    sum += s;
  }
}
console.log(sum);
