const FS = require("node:fs");

const cArray = FS.readFileSync("day09-input.txt", "utf-8");
//convert to bit

const disk = [];
let id = 0;
for (let i = 0; i < cArray.length; i++) {
  const count = parseInt(cArray[i]);
  disk.push(...Array(count).fill(i % 2 == 0 ? id++ : "."));
}
//move stuff around
let lastId = id - 1;
while (true) {
  const freePos = disk.indexOf(".");
  if (freePos < 0) break;
  let lastIdIndex = disk.lastIndexOf(lastId);
  if (lastIdIndex < freePos) {
    lastId--;
    if (lastId < 0) break;
  } else {
    disk[freePos] = lastId;
    disk[lastIdIndex] = ".";
  }
}
let sum = 0;
for (let i = 0; i < disk.length; i++) {
  if (disk[i] == ".") continue;
  sum += disk[i] * i;
}
console.log(sum);
