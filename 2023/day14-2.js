const fs = require("fs");

const data = fs.readFileSync("day14-1-input.txt", "utf-8");
const lines = data.split("\n");

const grid = [];
//column wise grid
for (let row = 0; row < lines.length; row++) {
  grid.push(lines[row].split(""));
}

// console.log(grid);

const rollNorth = () => {
  for (let col = 0; col < grid[0].length; col++) {
    while (true) {
      let is_changed = false;
      for (let row = grid.length - 1; row >= 1; row--) {
        if (grid[row][col] == "O" && grid[row - 1][col] == ".") {
          grid[row][col] = ".";
          grid[row - 1][col] = "O";
          is_changed = true;
        }
      }
      if (!is_changed) break;
    }
  }
};

const rollWest = () => {
  for (let row = 0; row < grid.length; row++) {
    while (true) {
      let is_changed = false;
      for (let col = grid[0].length - 1; col >= 1; col--) {
        if (grid[row][col] == "O" && grid[row][col - 1] == ".") {
          grid[row][col] = ".";
          grid[row][col - 1] = "O";
          is_changed = true;
        }
      }
      if (!is_changed) break;
    }
  }
};

const rollSouth = () => {
  for (let col = 0; col < grid[0].length; col++) {
    while (true) {
      let is_changed = false;
      for (let row = 0; row < grid.length - 1; row++) {
        if (grid[row][col] == "O" && grid[row + 1][col] == ".") {
          grid[row][col] = ".";
          grid[row + 1][col] = "O";
          is_changed = true;
        }
      }
      if (!is_changed) break;
    }
  }
};

const rollEast = () => {
  for (let row = 0; row < grid.length; row++) {
    while (true) {
      let is_changed = false;
      for (let col = 0; col < grid[0].length - 1; col++) {
        if (grid[row][col] == "O" && grid[row][col + 1] == ".") {
          grid[row][col] = ".";
          grid[row][col + 1] = "O";
          is_changed = true;
        }
      }
      if (!is_changed) break;
    }
  }
};

let count = 0;
const cache = [];
for (count = 1; count <= 1000; count++) {
  rollNorth();
  rollWest();
  rollSouth();
  rollEast();
  cache.push(structuredClone(grid));
}

//compare grids

let is_match = false;
let start = 0;
let diff = 0;

for (i = 0; i < cache.length - 1 && !is_match; i++) {
  for (j = i + 1; j < cache.length && !is_match; j++) {
    const src = cache[j];
    const target = cache[i];
    if (
      src.every((row_data, i) => row_data.every((c, j) => target[i][j] == c))
    ) {
      is_match = true;
      start = i + 1;
      diff = j - i;
    }
  }
}

console.log(start, diff);

const offset = (1000000000 - start) % diff;
const match_index = start - 1 + offset;
console.log(start, offset, match_index);

const match_grid = cache[match_index];
//calculate
let sum = 0;
for (let row = 0; row < match_grid.length; row++) {
  const o_count = match_grid[row].reduce((a, c) => a + (c == "O" ? 1 : 0), 0);
  sum += o_count * (lines.length - row);
}
console.log(sum);
