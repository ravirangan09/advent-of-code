const fs = require("fs");

const data = fs.readFileSync("day03-1-input.txt", "utf-8");
const lines = data.split("\n");
let sum = 0;
const isNumber = (c) => c >= "0" && c <= "9";
const isNumberOrDot = (c) => c == "." || isNumber(c);
const isSymbol = (c) => c && !isNumberOrDot(c);

const collectNumber = (line, pos) => {
  let number = parseInt(line[pos]);
  let tPos = pos - 1;
  while (isNumber(line[tPos])) {
    number += parseInt(line[tPos]) * 10 ** (pos - tPos);
    tPos--;
  }
  tPos = pos + 1;
  while (isNumber(line[tPos])) {
    number = number * 10 + parseInt(line[tPos]);
    tPos++;
  }
  return [tPos - 1, number];
};

for (let i = 0; i < lines.length; i++) {
  const currentLine = lines[i];
  if (!currentLine.length) continue;
  const prevLine = i > 0 ? lines[i - 1] : null;
  const nextLine =
    i + 1 < lines.length && lines[i + 1].length > 0 ? lines[i + 1] : null;

  for (let pos = 0; pos < currentLine.length; pos++) {
    if (isNumber(currentLine[pos])) {
      if (isSymbol(currentLine[pos + 1]) || isSymbol(currentLine[pos - 1])) {
        let [newPos, number] = collectNumber(currentLine, pos);
        pos = newPos;
        sum += number;
        continue;
      }
      if (prevLine) {
        if (
          isSymbol(prevLine[pos]) ||
          isSymbol(prevLine[pos - 1]) ||
          isSymbol(prevLine[pos + 1])
        ) {
          let [newPos, number] = collectNumber(currentLine, pos);
          pos = newPos;
          sum += number;
          continue;
        }
      }
      if (nextLine) {
        if (
          isSymbol(nextLine[pos]) ||
          isSymbol(nextLine[pos - 1]) ||
          isSymbol(nextLine[pos + 1])
        ) {
          let [newPos, number] = collectNumber(currentLine, pos);
          pos = newPos;
          sum += number;
          continue;
        }
      }
    }
  }
}
console.log(sum);
