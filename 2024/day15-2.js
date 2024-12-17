const FS = require("node:fs");

const data = FS.readFileSync("day15-sample-2.txt", "utf-8");
const lines = data.split("\n");
const emptyLineIndex = lines.findIndex((l) => l.length == 0);

const floorMap = lines.slice(0, emptyLineIndex).map((s) => s.split(""));
// const newFloorMap = Array(floorMap.length);

const dirs = lines.slice(emptyLineIndex + 1).join("");

let cx, cy;
//get starting position
// const expandMap = {
//   "#": ["#", "#"],
//   ".": [".", "."],
//   "@": ["@", "."],
//   O: ["[", "]"],
// };

// for (let y = 0; y < floorMap.length; y++) {
//   const newRow = [];
//   for (let x = 0; x < floorMap[0].length; x++) {
//     newRow.push(...expandMap[floorMap[y][x]]);
//   }
//   newFloorMap[y] = newRow;
//   const pos = newRow.indexOf("@");
//   if (pos >= 0) {
//     cx = pos;
//     cy = y;
//   }
// }

//get starting position
for (let y = 0; y < floorMap.length; y++) {
  const x = floorMap[y].indexOf("@");
  if (x >= 0) {
    cx = x;
    cy = y;
    break;
  }
}

const moves = {
  "^": { dx: 0, dy: -1 },
  v: { dx: 0, dy: 1 },
  ">": { dx: 1, dy: 0 },
  "<": { dx: -1, dy: 0 },
};

const doMove = (fMap, current, dir) => {
  const dest = { ...current };
  dest.x += moves[dir].dx;
  dest.y += moves[dir].dy;

  if (fMap[dest.y][dest.x] == "O") doMove(fMap, dest, dir);
  if (fMap[dest.y][dest.x] == ".") {
    fMap[dest.y][dest.x] = fMap[current.y][current.x];
    fMap[current.y][current.x] = ".";
    return dest;
  }
  return current;
};

console.log(cx, cy);
floorMap[cy][cx] = ".";
let current = { x: cx, y: cy };
for (const moveChar of dirs) {
  current = doMove(floorMap, current, moveChar);
}

let sum = 0;
for (let y = 0; y < floorMap.length; y++) {
  for (let x = 0; x < floorMap[0].length; x++) {
    if (floorMap[y][x] == "O") sum += y * 100 + x;
  }
}
console.log(sum);
