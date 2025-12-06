const FS = require("node:fs");

const data = FS.readFileSync("day01-input.txt", "utf-8");
const rows = data
  .split("\n")
  .filter((a) => a.length)
  .map((as) => [as[0], parseInt(as.slice(1))]);

console.log(rows);
let count = 0;
let current = 50;
for (let [dir, val] of rows) {
  val %= 100; //handle greater than 100 cases
  if (dir == "L") current -= val;
  else current += val;
  if (current < 0) current += 100;
  else current %= 100;
  if (current == 0) count++;
}

console.log(count);
