const FS = require("node:fs");

const data = FS.readFileSync("day01-input.txt", "utf-8");
const rows = data
  .split("\n")
  .filter((a) => a.length)
  .map((as) => [as[0], parseInt(as.slice(1))]);

console.log(rows);
let count = 0;
let current = 50;
let prev = 50;
for (let [dir, val] of rows) {
  // console.log(current, count, val);
  if (val >= 100) {
    count += Math.floor(val / 100);
  }
  val %= 100; //handle greater than 100 cases
  if (dir == "L") current -= val;
  else current += val;
  if (current < 0) {
    current += 100;
    if (prev > 0) count++;
  } else {
    if (current > 100) {
      count++;
    }
  }
  if (current >= 100) current %= 100;
  if (current == 0) count++;
  prev = current;
}

console.log(count);
