const FS = require("node:fs");

const lines = FS.readFileSync("day07-sample.txt", "utf-8");
const data = lines
  .split("\n")
  .map((l) => l.split("").filter((s) => s.length))
  .filter((a) => a.length);

let sc = data[0].indexOf("S");
let sr = 0;

let rows = data.length;
let cols = data[0].length;
console.log(rows, cols);
let count = 0;
let beams = [{ c: sc, r: sr + 1, s: false }];
let done = false;
while (beams.length) {
  let queue = [];
  for (const b of beams) {
    if (data[b.r][b.c] == ".") b.r++;
    else {
      count++;
      b.s = true;
      queue.push({ c: b.c - 1, r: b.r + 1, s: false });
      queue.push({ c: b.c + 1, r: b.r + 1, s: false });
    }
  }
  //filter common beams
  if (queue.length) beams.push(...queue);
  beams = beams.filter(
    (b, i, a) =>
      b.s === false &&
      b.r < rows &&
      a.findIndex((v) => b.r == v.r && b.c == v.c) === i
  );
}

console.log(count);
