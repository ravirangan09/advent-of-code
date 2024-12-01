const fs = require("fs");
const data = fs.readFileSync("day23-1-input-sample.txt", "utf-8");
const grid = data.split("\n").map((line) => line.split(""));
const max_x = grid[0].length - 1;
const max_y = grid.length - 1;
let max_value = -Infinity;

const key = (x, y) => x * 1000 + y;

const getNext = (x, y, visited) => {
  const next_a = [];

  //left
  if (x > 0 && grid[y][x - 1] != "#") {
    if (!visited.has(key(x - 1, y))) next_a.push([x - 1, y]);
  }
  //right
  if (x < max_x && grid[y][x + 1] != "#") {
    if (!visited.has(key(x + 1, y))) next_a.push([x + 1, y]);
  }

  //up
  if (y > 0 && grid[y - 1][x] != "#") {
    if (!visited.has(key(x, y - 1))) next_a.push([x, y - 1]);
  }

  //down
  if (y < max_y && grid[y + 1][x] != "#") {
    if (!visited.has(key(x, y + 1))) next_a.push([x, y + 1]);
  }

  return next_a;
};

const getLargestPath = (x, y, visited) => {
  if (y == max_y) {
    if (visited.size > max_value) {
      max_value = visited.size;
      console.log("reached bottom ", visited.size);
    }
    return;
  }

  let nx = x;
  let ny = y;
  const c = grid[y][x];
  switch (c) {
    case ">":
      nx = x + 1;
      break;
    case "<":
      nx = x - 1;
      break;
    case "^":
      ny = y - 1;
      break;
    case "v":
      ny = y + 1;
      break;
  }
  if (visited.has(key(nx, ny))) return; //incase of reverse path
  visited.add(key(x, y));
  if (visited != ".") visited.add(key(nx, ny));
  const next_a = getNext(nx, ny, visited);
  if (next_a.length > 0) {
    for (let i = 0; i < next_a.length; i++) {
      getLargestPath(...next_a[i], visited);
    }
  }
  if (c != ".") visited.delete(key(nx, ny));
  visited.delete(key(x, y));
};

const visited = new Set();
getLargestPath(1, 0, visited);

console.log(max_value);
