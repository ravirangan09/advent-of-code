const fs = require("fs");

const data = fs.readFileSync("day14-1-input-sample.txt", "utf-8");
const lines = data.split("\n");

const grid = [];
//column wise grid
for (let col = 0; col < lines[0].length; col++) {
  const col_data = [];
  for (let row = 0; row < lines.length; row++) {
    col_data.push(lines[row][col]);
  }
  grid.push(col_data);
}

for (let col = 0; col < grid.length; col++) {
  const col_data = grid[col];
  while (true) {
    let is_changed = false;
    for (let row = lines.length - 1; row >= 1; row--) {
      if (col_data[row] == "O" && col_data[row - 1] == ".") {
        col_data[row] = ".";
        col_data[row - 1] = "O";
        is_changed = true;
      }
    }
    if (!is_changed) break;
  }
}

//calculate
let sum = 0;
for (let row = 0; row < lines.length; row++) {
  const o_count = grid.reduce(
    (a, col_data) => a + (col_data[row] == "O" ? 1 : 0),
    0
  );
  sum += o_count * (lines.length - row);
}
console.log(sum);
