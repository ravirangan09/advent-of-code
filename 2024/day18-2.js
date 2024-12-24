const FS = require("node:fs");

const data = FS.readFileSync("day18-input.txt", "utf-8");
console.log(part2(data));
//https://github.com/shahata/adventofcode-solver
//bfs search
function part1(input, wh = 70, fallen = 1024) {
  let bytes = input.split("\n");
  let queue = [{ x: 0, y: 0, steps: 0 }];
  let visited = new Set(bytes.slice(0, fallen));
  while (queue.length) {
    let curr = queue.shift();
    if (curr.x === wh && curr.y === wh) return curr.steps;
    let neighbors = [
      { x: curr.x + 1, y: curr.y },
      { x: curr.x - 1, y: curr.y },
      { x: curr.x, y: curr.y + 1 },
      { x: curr.x, y: curr.y - 1 },
    ].filter(
      ({ x, y }) =>
        x >= 0 && x <= wh && y >= 0 && y <= wh && !visited.has(`${x},${y}`)
    );
    neighbors.forEach((neighbor) => {
      visited.add(`${neighbor.x},${neighbor.y}`);
      queue.push({ ...neighbor, steps: curr.steps + 1 });
    });
  }
}

function part2(input, wh = 70, fallen = 1024) {
  let bytes = input.split("\n");
  for (let i = fallen + 1; i < bytes.length; i++) {
    if (!part1(input, wh, i)) return bytes[i - 1];
  }
}
