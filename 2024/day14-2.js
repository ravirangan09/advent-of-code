const FS = require("node:fs");

const data = FS.readFileSync("day14-input.txt", "utf-8");
const lines = data.split("\n");

// // const floorWidth = 11;
// // const floorHeight = 7;
//stupid puzzle to draw christmas tree -
//code taken from some other solution

const floorWidth = 101;
const floorHeight = 103;

let qCount = Array(4).fill(0);
const tree = "###############################";
for (let iter = 1; iter < Infinity; iter++) {
  const tFloor = Array.from(Array(floorHeight), () =>
    Array(floorWidth).fill(".")
  );
  for (let i = 0; i < lines.length; i++) {
    const rExp = /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/;
    const [px, py, vx, vy] = lines[i]
      .match(rExp)
      .slice(1)
      .map((s) => +s);

    let fx = (px + iter * vx) % floorWidth;
    let fy = (py + iter * vy) % floorHeight;
    if (fx < 0) fx += floorWidth;
    if (fy < 0) fy += floorHeight;
    tFloor[fy][fx] = "#";
  }
  if (
    tFloor.some((tr, i) => {
      if (tr.join("").includes(tree)) {
        console.log("iter", iter);
        return true;
      }
      return false;
    })
  )
    break;
}

// const tree = [
//   "###############################",
//   "#.............................#",
//   "#.............................#",
//   "#.............................#",
//   "#.............................#",
//   "#..............#..............#",
//   "#.............###.............#",
//   "#............#####............#",
//   "#...........#######...........#",
//   "#..........#########..........#",
//   "#............#####............#",
//   "#...........#######...........#",
//   "#..........#########..........#",
//   "#.........###########.........#",
//   "#........#############........#",
//   "#..........#########..........#",
//   "#.........###########.........#",
//   "#........#############........#",
//   "#.......###############.......#",
//   "#......#################......#",
//   "#........#############........#",
//   "#.......###############.......#",
//   "#......#################......#",
//   "#.....###################.....#",
//   "#....#####################....#",
//   "#.............###.............#",
//   "#.............###.............#",
//   "#.............###.............#",
//   "#.............................#",
//   "#.............................#",
//   "#.............................#",
//   "#.............................#",
//   "###############################",
// ];

// function part2(input, w = 101, h = 103) {
//   const robots = input.split("\n").map((line) => {
//     const [, px, py, vx, vy] = line.match(/p=(.+),(.+) v=(.+),(.+)/);
//     return { px: +px, py: +py, vx: +vx, vy: +vy };
//   });
//   for (let i = 1; i < Infinity; i++) {
//     let map = new Array(h).fill().map(() => new Array(w).fill("."));
//     robots.forEach((robot) => {
//       robot.px = (w + robot.px + robot.vx) % w;
//       robot.py = (h + robot.py + robot.vy) % h;
//       map[robot.py][robot.px] = "#";
//     });
//     let match = 0;
//     for (let y = 0; y < h - tree.length; y++) {
//       if (map[y].join("").includes(tree[match])) {
//         match++;
//         return i;
//       } else if (match > 0) {
//         match = 0;
//         y--;
//       }
//     }
//   }
// }

// console.log(part2(data));
