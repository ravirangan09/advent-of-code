import os
// import math

pub fn main() {
  data := os.read_lines('day23-1-input-sample.txt') or { panic('Error') }
  grid := data.map(it.split(''))

  max_x := grid[0].len - 1
  max_y := grid.len - 1
  max_value := min_i32
}

fn key1(x int, y int) int {
  return x * 1000 + y
}


fn get_next(x int, y int, visited []int) => {
  next := [] ;

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
  visited << key(x,y)
  if (y == max_y) {
    if (visited.size > max_value) {
      max_value = visited.size;
      console.log("reached bottom ", visited.size);
    }
  }

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
};

const visited = new Set();
getLargestPath(1, 0, visited);

console.log(max_value - 1);
*/
