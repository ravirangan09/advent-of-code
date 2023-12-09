const fs = require("fs");

const data = fs.readFileSync("day09-1-input.txt", "utf-8");
const lines = data.split("\n").map((l) => l.split(" ").map((n) => parseInt(n)));

const getNextValue = (narr) => {
  const stack = [[...narr]];
  while (true) {
    const l = stack.at(-1);
    const new_row = [];
    for (let i = 1; i < l.length; i++) {
      new_row.push(l[i] - l[i - 1]);
    }
    stack.push(new_row);
    if (new_row.every((n) => n == 0)) break;
  }

  const stack_length = stack.length;
  let next_value = 0;
  for (let i = stack_length - 1; i >= 0; i--) {
    next_value += stack[i].at(-1);
  }
  return next_value;
};

let sum = 0;
for (let i = 0; i < lines.length; i++) {
  sum += getNextValue(lines[i]);
}
console.log(sum);
