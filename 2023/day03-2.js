const fs = require("fs");

const data = fs.readFileSync("day03-1-input.txt", "utf-8");
const lines = data.split("\n");
let sum = 0;
const isNumber = (c) => c >= "0" && c <= "9";
const isGear = (c) => c == "*";
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
  return number;
};

for (let i = 0; i < lines.length; i++) {
  const currentLine = lines[i];
  if (!currentLine.length) continue;
  const prevLine = i > 0 ? lines[i - 1] : null;
  const nextLine =
    i + 1 < lines.length && lines[i + 1].length > 0 ? lines[i + 1] : null;

  // console.log(`${i + 1}:${currentLine}`);
  for (let pos = 0; pos < currentLine.length; pos++) {
    if (isGear(currentLine[pos])) {
      const n_a = [];
      if (isNumber(currentLine[pos + 1])) {
        let number = collectNumber(currentLine, pos + 1);
        n_a.push(number);
      }
      if (isNumber(currentLine[pos - 1])) {
        let number = collectNumber(currentLine, pos - 1);
        n_a.push(number);
      }
      if (prevLine) {
        if (isNumber(prevLine[pos])) {
          let number = collectNumber(prevLine, pos);
          n_a.push(number);
        } else {
          if (isNumber(prevLine[pos - 1])) {
            let number = collectNumber(prevLine, pos - 1);
            n_a.push(number);
          }
          if (isNumber(prevLine[pos + 1])) {
            let number = collectNumber(prevLine, pos + 1);
            n_a.push(number);
          }
        }
      }
      if (nextLine) {
        if (isNumber(nextLine[pos])) {
          let number = collectNumber(nextLine, pos);
          n_a.push(number);
        } else {
          if (isNumber(nextLine[pos - 1])) {
            let number = collectNumber(nextLine, pos - 1);
            n_a.push(number);
          }
          if (isNumber(nextLine[pos + 1])) {
            let number = collectNumber(nextLine, pos + 1);
            n_a.push(number);
          }
        }
      }
      console.log(n_a);
      if (n_a.length == 2) sum += n_a[0] * n_a[1];
    } //if gear
  } //end for each char
  // if (i != 10) break;
} //end for each line
console.log(sum);
