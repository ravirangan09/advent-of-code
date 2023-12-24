//cleaner implementation of dijkstra algorithm
//dijkstra algorithm idea taken from
// https://www.geeksforgeeks.org/introduction-to-dijkstras-shortest-path-algorithm/#ways-to-implement-dijkstras-algorithm

const { PriorityQueue } = require("@datastructures-js/priority-queue");
const key = (n) => `${n.x}:${n.y}:${n.d}:${n.s}`;

const getAdjacentNodes = (current, grid) => {
  const next = [];
  if (current.d == "up" || current.d == "down") {
    let w = 0;
    for (let i = 0; i < 3; i++) {
      if (current.x - i > 0) {
        w += grid[current.x - 1 - i][current.y];
      }
    }
    for (i = 3; i < 10; i++) {
      if (current.x - i > 0) {
        w += grid[current.x - 1 - i][current.y];
        next.push({ d: "left", s: i, x: current.x - 1 - i, y: current.y, w });
      } else break;
    }
    w = 0;
    for (let i = 0; i < 3; i++) {
      if (current.x + i < grid[0].length - 1) {
        w += grid[current.x + 1 + i][current.y];
      }
    }
    for (i = 3; i < 10; i++) {
      if (current.x + i < grid[0].length - 1) {
        w += grid[current.x + 1 + i][current.y];
        next.push({ d: "right", s: i, x: current.x + 1 + i, y: current.y, w });
      } else break;
    }
  }

  if (current.d == "left" || current.d == "right") {
    let w = 0;
    for (let i = 0; i < 3; i++) {
      if (current.y - i > 0) {
        w += grid[current.x][current.y - 1 - i];
      }
    }
    for (i = 3; i < 10; i++) {
      if (current.y - i > 0) {
        w += grid[current.x][current.y - 1 - i];
        next.push({ d: "up", s: i, x: current.x, y: current.y - 1 - i, w });
      } else break;
    }
    w = 0;
    for (let i = 0; i < 3; i++) {
      if (current.y + i < grid.length - 1) {
        w += grid[current.x][current.y + 1 + i];
      }
    }
    for (i = 3; i < 10; i++) {
      if (current.y + i < grid.length - 1) {
        w += grid[current.x][current.y + 1 + i];
        next.push({ d: "down", s: i, x: current.x, y: current.y + 1 + i, w });
      } else break;
    }
  }
  return next;
};

function getShortestPath(grid) {
  const start_points = [
    { x: 0, y: 0, d: "right", s: 0, w: 0 },
    { x: 0, y: 0, d: "down", s: 0, w: 0 },
  ];
  const dist = {};
  for (const pt of start_points) {
    dist[key(pt)] = 0;
  }
  const compare = (a, b) => dist[key(a)] - dist[key(b)];
  const queue = new PriorityQueue(compare, start_points);
  const visited = new Map();

  let min = Infinity;
  // let i = 0;
  while (queue.size() > 0) {
    const current = queue.dequeue();
    if (visited.has(key(current))) continue;
    visited.set(key(current), true);
    const adjNodes = getAdjacentNodes(current, grid);
    adjNodes.forEach((n) => {
      if (!(key(n) in dist)) dist[key(n)] = Infinity;
      if (!visited.has(key(n)) && dist[key(current)] + n.w < dist[key(n)]) {
        dist[key(n)] = dist[key(current)] + n.w;
        //check for min
        if (n.x == grid[0].length - 1 && n.y == grid.length - 1) {
          if (dist[key(n)] < min) min = dist[key(n)];
        }
        queue.enqueue(n);
      }
    });
  }
  console.log("done ");
  return min;
}

const fs = require("fs");
const data = fs.readFileSync("day17-1-input.txt", "utf-8");
const grid = data.split("\n").map((line) => line.split("").map(Number));

console.log(getShortestPath(grid));
