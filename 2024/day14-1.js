const FS = require("node:fs");

const data = FS.readFileSync("day14-input.txt", "utf-8");
const lines = data.split("\n");

// const floorWidth = 11;
// const floorHeight = 7;
const floorWidth = 101;
const floorHeight = 103;

let qCount = Array(4).fill(0);
for (let i = 0; i < lines.length; i++) {
  const rExp = /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/;
  console.log(lines[i]);
  const [px, py, vx, vy] = lines[i]
    .match(rExp)
    .slice(1)
    .map((s) => parseInt(s));

  let fx = (px + 100 * vx) % floorWidth;
  let fy = (py + 100 * vy) % floorHeight;
  if (fx < 0) fx += floorWidth;
  if (fy < 0) fy += floorHeight;
  qCount[0] +=
    fx < Math.floor(floorWidth / 2) && fy < Math.floor(floorHeight / 2);
  qCount[1] +=
    fx > Math.floor(floorWidth / 2) && fy < Math.floor(floorHeight / 2);
  qCount[2] +=
    fx < Math.floor(floorWidth / 2) && fy > Math.floor(floorHeight / 2);
  qCount[3] +=
    fx > Math.floor(floorWidth / 2) && fy > Math.floor(floorHeight / 2);
}

console.log(qCount.reduce((a, d) => a * d, 1));
