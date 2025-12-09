const FS = require("node:fs");

const lines = FS.readFileSync("day04-input.txt", "utf-8");
let data = lines
  .split("\n")
  .map((str) => str.split(""))
  .filter((a) => a.length);

console.log(data);
const rows = data.length;
const cols = data[0].length;

const getAdjacentCount = (r, c) => {
  let count = 0;
  const lookup = [
    [r - 1, c - 1],
    [r - 1, c],
    [r - 1, c + 1],
    [r, c - 1],
    [r, c + 1],
    [r + 1, c - 1],
    [r + 1, c],
    [r + 1, c + 1],
  ];
  for (const [cr, cc] of lookup) {
    if (cr >= 0 && cr < rows && cc >= 0 && cc < cols && data[cr][cc] == "@")
      count++;
  }
  return count;
};

let result = 0;
let prevData = structuredClone(data);
while (true) {
  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (data[r][c] == "@" && getAdjacentCount(r, c) < 4) {
        count++;
        prevData[r][c] = ".";
      }
    }
  }
  result += count;
  data = structuredClone(prevData);
  if (count == 0) break;
}
console.log(result);
