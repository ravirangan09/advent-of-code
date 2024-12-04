const FS = require("node:fs");

const data = FS.readFileSync("day04-input.txt", "utf-8");
const cArray = data.split("\n").map((l) => l.split(""));

const checkForWord = (pr, pc, nr, nc) => {
  const rowCount = cArray.length;
  const colCount = cArray[0].length;
  if ([pr, nr].some((v) => v < 0 || v >= rowCount)) return false;
  if ([pc, nc].some((v) => v < 0 || v >= colCount)) return false;

  return cArray[pr][pc] == "M" && cArray[nr][nc] == "S";
};

const checkAllDir = (row, col) => {
  let count = 0;

  //forward
  if (
    checkForWord(row - 1, col - 1, row + 1, col + 1) &&
    checkForWord(row - 1, col + 1, row + 1, col - 1)
  )
    count++;

  if (
    checkForWord(row - 1, col - 1, row + 1, col + 1) &&
    checkForWord(row + 1, col - 1, row - 1, col + 1)
  )
    count++;

  //reverse
  if (
    checkForWord(row + 1, col + 1, row - 1, col - 1) &&
    checkForWord(row - 1, col + 1, row + 1, col - 1)
  )
    count++;

  if (
    checkForWord(row + 1, col + 1, row - 1, col - 1) &&
    checkForWord(row + 1, col - 1, row - 1, col + 1)
  )
    count++;

  return count;
};

let count = 0;
for (let row = 0; row < cArray.length; row++) {
  for (let col = 0; col < cArray[0].length; col++) {
    if (cArray[row][col] == "A") {
      count += checkAllDir(row, col);
    }
  }
}

console.log(count);
