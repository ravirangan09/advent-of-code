const fs = require("fs");

const data = fs.readFileSync("day08-1-input-sample.txt", "utf-8");
const lines = data.split("\n");
const sequence = lines[0];

const lookup = {};

for (let i = 2; i < lines.length; i++) {
  const l = lines[i];
  const key = l.slice(0, 3);
  const left = l.slice(7, 10);
  const right = l.slice(12, 15);
  lookup[key] = [left, right];
}

let step_count = 0;
let current_key = "AAA";
const end_key = "ZZZ";
while (current_key != end_key) {
  for (const step of sequence) {
    const index = step == "L" ? 0 : 1;
    current_key = lookup[current_key][index];
    step_count++;
    if (current_key == end_key) break;
  }
}
console.log(step_count);
