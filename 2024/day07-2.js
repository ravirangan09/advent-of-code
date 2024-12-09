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
  const ol = operands.length - 1;
  const iterCount = 3 ** ol;
  for (let i = 0; i < iterCount; i++) {
    const str = Number(i).toString(3).padStart(ol, "0");
    let v = operands[0];
    for (let i = 0; i < str.length; i++) {
      const c = str[i];
      switch (c) {
        case "0":
          v += operands[i + 1];
          break;
        case "1":
          v *= operands[i + 1];
          break;
        case "2":
          v = parseInt(v.toString() + operands[i + 1].toString());
          break;
      }
    }
    if (v == answer) {
      sum += answer;
      break;
    }
  }
}

console.log(sum);
