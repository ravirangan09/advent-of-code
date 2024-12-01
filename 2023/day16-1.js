const fs = require("fs");

const data = fs.readFileSync("day16-1-input.txt", "utf-8");
const lines = data.split("\n");
const grid = [];
for (let i = 0; i < lines.length; i++) {
  grid.push(lines[i].split(""));
}
const total_rows = grid.length;
const total_columns = grid[0].length;

const getNextPos = (row, col, direction) => {
  const c = grid[row][col];
  switch (direction) {
    case "east":
      switch (c) {
        case ".":
        case "-":
          return [[row, col + 1, direction]];
        case "/":
          return [[row - 1, col, "north"]];
        case "\\":
          return [[row + 1, col, "south"]];
        case "|":
          //split
          return [
            [row - 1, col, "north"],
            [row + 1, col, "south"],
          ];
      }
      break;
    case "west":
      switch (c) {
        case ".":
        case "-":
          return [[row, col - 1, direction]];
        case "/":
          return [[row + 1, col, "south"]];
        case "\\":
          return [[row - 1, col, "north"]];
        case "|":
          //split
          return [
            [row - 1, col, "north"],
            [row + 1, col, "south"],
          ];
      }
      break;
    case "north":
      switch (c) {
        case ".":
        case "|":
          return [[row - 1, col, direction]];
        case "/":
          return [[row, col + 1, "east"]];
        case "\\":
          return [[row, col - 1, "west"]];
        case "-":
          //split
          return [
            [row, col + 1, "east"],
            [row, col - 1, "west"],
          ];
      }
      break;
    case "south":
      switch (c) {
        case ".":
        case "|":
          return [[row + 1, col, direction]];
        case "/":
          return [[row, col - 1, "west"]];
        case "\\":
          return [[row, col + 1, "east"]];
        case "-":
          //split
          return [
            [row, col + 1, "east"],
            [row, col - 1, "west"],
          ];
      }
      break;
  }
};

let visited = [[0, 0, "east"]];
let index = 0;
while (true) {
  if (index == visited.length) break;
  let current = visited[index];
  let [row, col, direction] = current;
  if (row < 0 || col < 0 || row >= total_rows || col >= total_columns) {
    visited.splice(index, 1);
    continue;
  }
  const next_a = getNextPos(row, col, direction);
  for (const next of next_a) {
    const match = visited.find(
      (s) => s[0] == next[0] && s[1] == next[1] && s[2] == next[2]
    );
    if (match) continue;
    visited.push(next);
  }
  index++;
}

// console.log(JSON.stringify(paths, null, 2));
const energized_a = visited.filter(
  (ov, i, a) => a.findIndex((iv) => iv[0] == ov[0] && iv[1] == ov[1]) == i
);

console.log(energized_a.length);
