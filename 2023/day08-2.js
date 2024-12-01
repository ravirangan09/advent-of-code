const fs = require("fs");
const lcm = require("compute-lcm");

const data = fs.readFileSync("day08-1-input.txt", "utf-8");
const lines = data.split("\n");
const sequence = lines[0];

const lookup = {};
let current_keys = [];
for (let i = 2; i < lines.length; i++) {
  const l = lines[i];
  const key = l.slice(0, 3);
  const left = l.slice(7, 10);
  const right = l.slice(12, 15);
  lookup[key] = [left, right];
  if (key[2] == "A") current_keys.push(key);
}

// current_keys = [current_keys[0]];
console.log("l ", current_keys);
const all_steps = [];
for (let i = 0; i < current_keys.length; i++) {
  let ckey = current_keys[i];
  let step_count = 0;
  while (ckey[2] != "Z") {
    for (const step of sequence) {
      const index = step == "L" ? 0 : 1;
      ckey = lookup[ckey][index];
      step_count++;
      if (ckey[2] == "Z") break;
    }
  }
  all_steps.push(step_count);
}

console.log(lcm(...all_steps));
