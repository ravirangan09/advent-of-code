const fs = require("fs");
const data = fs.readFileSync("day23-1-input.txt", "utf-8");
const grid = data.split("\n").map((line) => line.split(""));
const max_x = grid[0].length - 1;
const max_y = grid.length - 1;
let max_value = -Infinity;

const key = (x, y) => `${x}:${y}`;

const getNext = (x, y, visited) => {
  const next = [];

  //left
  if (x > 0 && grid[y][x - 1] != "#" && !visited.has(key(x - 1, y))) {
    const c = grid[y][x - 1];
    if (c != ">") next.push([x - 1, y]);
  }
  //right
  if (x < max_x && grid[y][x + 1] != "#" && !visited.has(key(x + 1, y))) {
    const c = grid[y][x + 1];
    if (c != "<") next.push([x + 1, y]);
  }

  //up
  if (y > 0 && grid[y - 1][x] != "#" && !visited.has(key(x, y - 1))) {
    const c = grid[y - 1][x];
    if (c != "v") next.push([x, y - 1]);
  }

  //down
  if (y < max_y && grid[y + 1][x] != "#" && !visited.has(key(x, y + 1))) {
    const c = grid[y + 1][x];
    if (c != "^") next.push([x, y + 1]);
  }

  return next;
};

const getLargestPath = (x, y, visited) => {
  visited.add(key(x, y));
  const c = grid[y][x];
  switch (c) {
    case ">":
      x = x + 1;
      break;
    case "<":
      x = x - 1;
      break;
    case "^":
      y = y - 1;
      break;
    case "v":
      y = y + 1;
      break;
  }
  if (c != ".") visited.add(key(x, y));
  const next = getNext(x, y, visited);
  if (next.length > 0) {
    for (let i = 0; i < next.length; i++) {
      getLargestPath(...next[i], structuredClone(visited));
    }
  }
  if (visited.size > max_value) max_value = visited.size;
};

const visited = new Set();
getLargestPath(1, 0, visited);

console.log(max_value - 1);
