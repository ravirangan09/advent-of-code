const FS = require("node:fs");

const data = FS.readFileSync("day06-input.txt", "utf-8");
const cArray = data.split("\n").map((l) => l.split(""));
// console.log(cArray);

let cr = 0;
let cc = 0;
let steps = 0;
let dir = "up";
const visited = [];

const setStartPos = () => {
  for (let row = 0; row < cArray.length; row++) {
    const pos = cArray[row].indexOf("^");
    if (pos >= 0) {
      cr = row;
      cc = pos;
      break;
    }
  }
};

const canMove = () => {
  let nr = cr;
  let nc = cc;
  let ndir = dir;
  switch (dir) {
    case "up":
      if (cr == 0) return false;
      nr--;
      ndir = "right";
      break;
    case "down":
      if (cr == cArray.length - 1) return false;
      nr++;
      ndir = "left";
      break;
    case "left":
      if (cc == 0) return false;
      nc--;
      ndir = "up";
      break;
    case "right":
      if (cc == cArray[0].length - 1) return false;
      nc++;
      ndir = "down";
      break;
  }
  if (cArray[nr][nc] == "#") dir = ndir;
  return true;
};

const moveNext = () => {
  switch (dir) {
    case "up":
      cr--;
      break;
    case "right":
      cc++;
      break;
    case "down":
      cr++;
      break;
    case "left":
      cc--;
      break;
  }
};

setStartPos();
while (true) {
  const key = cr + ":" + cc;
  if (!visited.includes(key)) {
    visited.push(key);
    steps++;
  }
  if (!canMove()) break;
  moveNext();
}
console.log(steps);
