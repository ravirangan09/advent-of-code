const FS = require("node:fs");

const data = FS.readFileSync("day06-input.txt", "utf-8");
const cArray = data.split("\n").map((l) => l.split(""));

// console.log(cArray);

let cr = 0;
let cc = 0;
let sr = 0;
let sc = 0;
const route = [];
let steps = 0;
let dir = "up";
let visited = [];
const dirKeys = {};

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

const doInitialWalk = () => {
  cr = sr;
  cc = sc;
  while (true) {
    const key = cr + ":" + cc + ":" + dir;
    if (!visited.includes(key)) {
      visited.push(key);
    }
    if (!canMove()) break;
    moveNext();
  }
};

const doWalk = (walked) => {
  cr = sr;
  cc = sc;
  const key = cr + ":" + cc + ":" + dir;

  let v = [key];
  while (true) {
    if (!canMove()) return false;
    moveNext();
    const key = cr + ":" + cc + ":" + dir;
    if (walked.includes(key)) {
      return true;
    } else {
      if (v.includes(key)) return false; //internal loop
      v.push(key);
    }
  }
};

setStartPos();
doInitialWalk();
let count = 0;
for (let i = 2; i < visited.length; i++) {
  //start from before newly placed obstruction
  const [r1, c1, d1] = visited[i - 1].split(":");
  sr = parseInt(r1);
  sc = parseInt(c1);
  dir = d1;
  const [r0, c0, d0] = visited[i].split(":");
  const or = parseInt(r0);
  const oc = parseInt(c0);

  cArray[or][oc] = "#";
  const walked = visited.slice(0, i - 1);
  console.log("st1");
  if (doWalk(walked)) {
    count++;
    console.log("loop ", or, oc);
  }
  cArray[or][oc] = "."; //reset to prev value
}
console.log(count);
