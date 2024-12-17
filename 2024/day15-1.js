const FS = require("node:fs");

const data = FS.readFileSync("day15-input.txt", "utf-8");
const lines = data.split("\n");
const emptyLineIndex = lines.findIndex((l) => l.length == 0);

const floorMap = lines.slice(0, emptyLineIndex).map((s) => s.split(""));

const dirs = lines.slice(emptyLineIndex + 1).join("");

let cx, cy;
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

const doMove = (moveChar) => {
  const { dx, dy } = moves[moveChar];
  let [nx, ny] = [cx + dx, cy + dy];
  const c = floorMap[ny][nx];
  if (c == "#") return; //connot move
  if (c == ".") {
    cx = nx;
    cy = ny;
  } else {
    //it is O(letter o)
    let boxCount = 1;
    let hasSpace = false;
    while (true) {
      nx += dx;
      ny += dy;
      const c = floorMap[ny][nx];
      if (c == "O") {
        boxCount++;
        continue;
      }
      if (c == ".") {
        hasSpace = true;
      } else {
        //wall do nothing
      }
      break;
    } // end while
    if (hasSpace) {
      //move boxes to new space
      for (let i = 0; i < boxCount; i++) {
        floorMap[ny][nx] = "O";
        nx -= dx;
        ny -= dy;
      }
      floorMap[ny][nx] = ".";
      cx = nx;
      cy = ny;
    }
  }
};

floorMap[cy][cx] = ".";
for (const moveChar of dirs) {
  doMove(moveChar);
}

let sum = 0;
for (let y = 0; y < floorMap.length; y++) {
  for (let x = 0; x < floorMap[0].length; x++) {
    if (floorMap[y][x] == "O") sum += y * 100 + x;
  }
}
console.log(sum);
