const FS = require("node:fs");

const data = FS.readFileSync("day07-input.txt", "utf-8");
const lines = data.split("\n").map((l) => l.split(": "));
const equations = lines.map((l) => {
  const answer = parseInt(l[0]);
  const operands = l[1].split(" ").map((s) => parseInt(s));
  return { answer, operands };
});

let sum = 0;

for (const { answer, operands } of equations) {
  const iterCount = 2 ** (operands.length - 1);
  for (let i = 0; i < iterCount; i++) {
    let v = operands[0];
    for (let pos = 0; pos < operands.length - 1; pos++) {
      const o = (1 << pos) & i;
      if (o == 0) {
        v += operands[pos + 1];
      } else {
        v *= operands[pos + 1];
      }
    }
    if (v == answer) {
      sum += answer;
      break;
    }
  }
}

console.log(sum);
