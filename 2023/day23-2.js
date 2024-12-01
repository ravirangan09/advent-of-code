const { PriorityQueue } = require("@datastructures-js/priority-queue");
const fs = require("fs");
const data = fs.readFileSync("day23-1-input-sample.txt", "utf-8");
const grid = data.split("\n").map((line) => line.split(""));
const max_x = grid[0].length - 1;
const max_y = grid.length - 1;
const key = (n) => n.y * 1000 + n.x;

const start_node = { y: 0, x: 1, d: "south", edges: [] };
const end_node = { y: max_y, x: max_x - 1, d: "north" };
const start_key = key(start_node);
const end_key = key(end_node);
const graph_nodes = {};
graph_nodes[start_key] = start_node;
graph_nodes[end_key] = end_node;
const visited = {};

const getNeighbors = ({ x, y, d }) => {
  const next_a = [];
  switch (d) {
    case "south":
      next_a.push(
        { x: x - 1, y, d: "west" },
        { x: x + 1, y, d: "east" },
        { x, y: y + 1, d: "south" }
      );
      break;
    case "north":
      next_a.push(
        { x: x - 1, y, d: "west" },
        { x: x + 1, y, d: "east" },
        { x, y: y - 1, d: "north" }
      );
      break;
    case "west":
      next_a.push(
        { x: x - 1, y, d: "west" },
        { x: x, y: y - 1, d: "north" },
        { x, y: y + 1, d: "south" }
      );
      break;
    case "east":
      next_a.push(
        { x: x + 1, y, d: "east" },
        { x: x, y: y - 1, d: "north" },
        { x, y: y + 1, d: "south" }
      );
      break;
  }
  return next_a.filter(
    (n) =>
      n.y >= 0 &&
      n.y <= max_y &&
      n.x >= 0 &&
      n.x <= max_x &&
      grid[n.y][n.x] != "#"
  );
};

const traversePath = (node) => {
  let steps = 0;
  while (true) {
    const next_a = getNeighbors(node);
    if (next_a.length == 1) {
      steps++;
      node = next_a[0];
    } else return [node, steps, next_a];
  }
};

const createGraph = (parent_node, first_node) => {
  visited[key(first_node)] = true;
  let [target_node, steps, next_a] = traversePath(first_node);
  const target = key(target_node);
  if (!(target in graph_nodes)) {
    graph_nodes[target] = target_node;
    target_node.edges = [];
  } else target_node = graph_nodes[target];
  parent_node.edges.push({ w: steps, t: target });
  for (const next of next_a) {
    if (!visited[key(next)]) {
      createGraph(target_node, next);
    }
  }
};

function getLongestPath() {
  const start_points = [graph_nodes[start_key]];
  const dist = {};
  for (const pt of start_points) {
    dist[key(pt)] = 0;
  }
  const compare = (a, b) => dist[key(b)] - dist[key(a)];
  const queue = new PriorityQueue(compare, start_points);
  const visited = new Map();

  let max = -Infinity;
  // let i = 0;
  while (queue.size() > 0) {
    const current = queue.dequeue();
    if (visited.has(key(current))) continue;
    visited.set(key(current), true);
    const adjNodes = current.edges;
    adjNodes.forEach((n) => {
      if (!(n.t in dist)) dist[n.t] = -Infinity;
      if (!visited.has(n.t) && dist[key(current)] + n.w > dist[n.t]) {
        dist[n.t] = dist[key(current)] + n.w;
        //check for min
        if (n.t == end_key) {
          if (dist[n.t] > max) max = dist[n.t];
          return;
        }
        queue.enqueue(graph_nodes[n.t]);
      }
    });
  }
  console.log("done ");
  return max;
}

createGraph(graph_nodes[start_key], graph_nodes[start_key]);
console.log(graph_nodes);
console.log(getLongestPath());
