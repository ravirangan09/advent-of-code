const fs = require("fs");

const data = fs.readFileSync("day01-1-input.txt", "utf-8");
const lines = data.split("\n");
// console.log(lines.length, lines[0]);
const lookup = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};
let sum = 0;
for (const l of lines) {
  const r = /one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9/;
  const digits = [];
  let start = 0;
  while (true) {
    const m = l.slice(start).match(r);
    if (!m) break;
    digits.push(lookup[m[0]]);
    start += m.index + 1;
  }
  console.log(l, digits);
  if (digits.length) sum += digits.at(0) * 10 + digits.at(-1);
}
console.log(sum);
