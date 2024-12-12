const FS = require("node:fs");
const step = {
  up: { x: 0, y: -1, turn: "right" },
  down: { x: 0, y: 1, turn: "left" },
  left: { x: -1, y: 0, turn: "up" },
  right: { x: 1, y: 0, turn: "down" },
};

function test({ map, current }, add = undefined) {
  const visited = new Set();
  const turns = new Set();
  if (add) map[add.y][add.x] = "#";
  map[current.y][current.x] = ".";
  while (map[current.y]?.[current.x]) {
    const next = { ...current };
    while (map[next.y]?.[next.x] === ".") {
      if (!add) visited.add(`${next.y}:${next.x}`);
      next.x += step[current.direction].x;
      next.y += step[current.direction].y;
    }
    if (map[next.y]?.[next.x] === "#") {
      next.x -= step[current.direction].x;
      next.y -= step[current.direction].y;
      next.direction = step[current.direction].turn;
      if (turns.has(`${next.y},${next.x},${next.direction}`)) {
        console.log("tlt ", turns.size, true);
        return turns;
      }
      turns.add(`${next.y},${next.x},${next.direction}`);
    }
    current = next;
  }
  return add ? undefined : visited;
}

function parse(input) {
  const map = input.split("\n").map((line) => line.split(""));
  const startY = map.findIndex((line) => line.includes("^"));
  const startX = map[startY].indexOf("^");
  const current = { x: startX, y: startY, direction: "up" };
  return { map, current };
}

function part1(input) {
  return test(parse(input)).size;
}

function part2(input) {
  let count = 0;
  let i = 0;
  test(parse(input)).forEach((pos) => {
    const [y, x] = pos.split(":").map(Number);
    if (test(parse(input), { x, y, i })) count++;
    i++;
  });

  return count;
}

const data = FS.readFileSync("day06-input.txt", "utf-8");
console.log(part2(data));
