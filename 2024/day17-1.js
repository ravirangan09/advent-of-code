const FS = require("node:fs");

const data = FS.readFileSync("day17-input.txt", "utf-8");
const lines = data.split("\n");
const emptyLineIndex = lines.findIndex((l) => l.length == 0);

const regLines = lines.slice(0, emptyLineIndex);
console.log(regLines);
let regA = parseInt(regLines[0].match(/Register A: (\d+)/)[1]);
let regB = parseInt(regLines[1].match(/Register B: (\d+)/)[1]);
let regC = parseInt(regLines[2].match(/Register C: (\d+)/)[1]);

console.log(regA, regB, regC);

const program = lines[emptyLineIndex + 1]
  .slice("Program: ".length)
  .split(",")
  .map((s) => parseInt(s));

const out = [];

const getOperandValue = (comboOperand) => {
  if (comboOperand == 4) return regA;
  if (comboOperand == 5) return regB;
  if (comboOperand == 6) return regC;
  return comboOperand;
};

for (let i = 0; i < program.length; ) {
  const opcode = program[i];
  const operand = program[i + 1];
  let canJump = false;
  switch (opcode) {
    case 0:
      regA = Math.floor(regA / 2 ** getOperandValue(operand));
      break;
    case 1:
      regB = regB ^ operand;
      break;
    case 2:
      regB = getOperandValue(operand) & 7;
      break;
    case 3:
      if (regA != 0) {
        i = operand;
        canJump = true;
      }
      break;
    case 4:
      regB = regB ^ regC;
      break;
    case 5:
      out.push(getOperandValue(operand) & 7);
      break;
    case 6:
      regB = Math.floor(regA / 2 ** getOperandValue(operand));
      break;
    case 7:
      regC = Math.floor(regA / 2 ** getOperandValue(operand));
      break;
  }
  if (!canJump) i += 2;
}

console.log(out.join(","));
