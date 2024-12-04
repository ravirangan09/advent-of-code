const FS = require("node:fs");

const data = FS.readFileSync("day04-input.txt", "utf-8");
const cArray = data.split("\n").map((l) => l.split(""));

const checkForWord = (fr, fc, sr, sc, tr, tc) => {
  const rowCount = cArray.length;
  const colCount = cArray[0].length;
  if ([fr, sr, tr].some((v) => v < 0 || v >= rowCount)) return false;
  if ([fc, sc, tc].some((v) => v < 0 || v >= colCount)) return false;

  return (
    cArray[fr][fc] == "M" && cArray[sr][sc] == "A" && cArray[tr][tc] == "S"
  );
};

const checkAllDir = (row, col) => {
  let count = 0;

  //forward
  if (checkForWord(row, col + 1, row, col + 2, row, col + 3)) count++;
  //backward
  if (checkForWord(row, col - 1, row, col - 2, row, col - 3)) count++;
  //vertical up
  if (checkForWord(row - 1, col, row - 2, col, row - 3, col)) count++;
  //vertical down
  if (checkForWord(row + 1, col, row + 2, col, row + 3, col)) count++;

  //north west
  if (checkForWord(row - 1, col - 1, row - 2, col - 2, row - 3, col - 3))
    count++;

  //south west
  if (checkForWord(row + 1, col - 1, row + 2, col - 2, row + 3, col - 3))
    count++;
  //south east
  if (checkForWord(row + 1, col + 1, row + 2, col + 2, row + 3, col + 3))
    count++;
  //north east
  if (checkForWord(row - 1, col + 1, row - 2, col + 2, row - 3, col + 3))
    count++;
  return count;
};

let count = 0;
for (let row = 0; row < cArray.length; row++) {
  for (let col = 0; col < cArray[0].length; col++) {
    if (cArray[row][col] == "X") {
      count += checkAllDir(row, col);
    }
  }
}

console.log(count);
