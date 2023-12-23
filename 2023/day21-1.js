const fs = require("fs");
const data = fs.readFileSync("day21-1-input.txt", "utf-8");
const lines = data.split("\n");
const grid = [];
let start_row = 0;
let start_col = 0;

for (let i = 0; i < lines.length; i++) {
  const pos = lines[i].indexOf("S");
  if (pos >= 0) {
    start_row = i;
    start_col = pos;
  }
  grid.push(lines[i].split(""));
}

const isValidRowCol = (r, c) =>
  r >= 0 &&
  r < grid.length &&
  c >= 0 &&
  c <= grid[0].length &&
  (grid[r][c] == "." || grid[r][c] == "S");

const processStep = (plots) => {
  const new_plots = [];

  const isPresent = (row, col) =>
    new_plots.find((p) => p[0] == row && p[1] == col) !== undefined;

  for (const [row, col] of plots) {
    if (isValidRowCol(row - 1, col) && !isPresent(row - 1, col)) {
      new_plots.push([row - 1, col]);
    }

    if (isValidRowCol(row + 1, col) && !isPresent(row + 1, col)) {
      new_plots.push([row + 1, col]);
    }

    if (isValidRowCol(row, col - 1) && !isPresent(row, col - 1)) {
      new_plots.push([row, col - 1]);
    }
    if (isValidRowCol(row, col + 1) && !isPresent(row, col + 1)) {
      new_plots.push([row, col + 1]);
    }
  }
  return new_plots;
};

let plots = [[start_row, start_col]];
for (let steps = 1; steps <= 64; steps++) {
  plots = processStep(plots);
}

console.log(plots.length);
