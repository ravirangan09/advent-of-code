//code taken from
//https://github.com/shahata/adventofcode-solver/blob/master/src/2023/day17.js

const { PriorityQueue } = require("@datastructures-js/priority-queue");

const getAdjacentNodes = (current, grid) => {
  const match = grid.find((n) => n.x == current.x);
  return match.adj;
};

function getShortestPath(grid) {
  const key = (n) => n.x;
  const dist = { [key(grid[0])]: 0 };
  const compare = (a, b) => dist[key(a)] - dist[key(b)];
  const queue = new PriorityQueue(compare, [grid[0]]);
  const visited = new Map();

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
        queue.enqueue(n);
      }
    });
  }
  console.log("done ", dist);
  return 0;
}

const grid = [
  {
    x: 0,
    adj: [
      { x: 1, w: 2 },
      { x: 2, w: 6 },
    ],
  },
  {
    x: 1,
    adj: [
      { x: 0, w: 2 },
      { x: 3, w: 5 },
    ],
  },
  {
    x: 2,
    adj: [
      { x: 0, w: 6 },
      { x: 3, w: 8 },
    ],
  },
  {
    x: 3,
    adj: [
      { x: 2, w: 8 },
      { x: 1, w: 5 },
      { x: 4, w: 10 },
      { x: 5, w: 15 },
    ],
  },
  {
    x: 4,
    adj: [
      { x: 3, w: 10 },
      { x: 6, w: 2 },
    ],
  },
  {
    x: 5,
    adj: [
      { x: 3, w: 15 },
      { x: 6, w: 6 },
    ],
  },
  {
    x: 6,
    adj: [
      { x: 4, w: 2 },
      { x: 5, w: 6 },
    ],
  },
];

getShortestPath(grid);
