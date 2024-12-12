const FS = require("node:fs");

const data = FS.readFileSync("day06-input.txt", "utf-8");
const cArray = data.split("\n").map((l) => l.split(""));

// console.log(cArray);

let cr = 0;
let cc = 0;
let sr = 0;
let sc = 0;

let dir = "up";

const setStartPos = () => {
  for (let row = 0; row < cArray.length; row++) {
    const pos = cArray[row].indexOf("^");
    if (pos >= 0) {
      sr = row;
      sc = pos;
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
  if (cArray[nr][nc] == "#") return ndir;
  return dir;
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

const doInitialWalk = () => {
  const visited = [];
  cr = sr;
  cc = sc;
  while (true) {
    const key = cr + ":" + cc;
    if (!visited.includes(key)) {
      visited.push(key);
    }
    const ndir = canMove();
    if (!ndir) break;
    dir = ndir;
    moveNext();
  }
  return visited;
};

const doWalk = (iter) => {
  cr = sr;
  cc = sc;
  const turns = [];
  let retCode = false;
  while (true) {
    const ndir = canMove();
    if (!ndir) {
      break;
    }
    if (dir != ndir) {
      dir = ndir;
      const key = cr + ":" + cc + ":" + dir;
      if (turns.includes(key)) {
        retCode = true;
        break;
      }
      turns.push(key);
    }
    moveNext();
  }
  console.log(iter, turns);
  return retCode;
};

setStartPos();
const visited = doInitialWalk();
let count = 0;

for (let i = 1; i < visited.length; i++) {
  dir = "up";
  const [r0, c0] = visited[i].split(":");
  const or = parseInt(r0);
  const oc = parseInt(c0);

  cArray[or][oc] = "#";
  if (doWalk(i)) {
    count++;
  }
  cArray[or][oc] = "."; //reset to prev value
}
console.log(count);
