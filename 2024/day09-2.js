const FS = require("node:fs");

const cArray = FS.readFileSync("day09-input.txt", "utf-8");
//convert to bit

const disk = [];
const lookup = {};
let id = 0;
for (let i = 0; i < cArray.length; i++) {
  const count = parseInt(cArray[i]);
  lookup[id] = count;
  disk.push(...Array(count).fill(i % 2 == 0 ? id++ : "."));
}
//move stuff around

let lastId = id - 1;
while (lastId >= 0) {
  let idIndex = disk.indexOf(lastId);
  if (idIndex < 0) break;
  let idCount = lookup[lastId];

  let start = 0;
  while (true) {
    let freePos = -1;
    for (let i = start; i < disk.length; i++) {
      if (disk[i] == ".") {
        freePos = i;
        break;
      }
    }
    if (freePos < 0) break;
    if (freePos > idIndex) break;
    let dotCount = 0;
    for (let i = freePos; disk[i] == "."; i++) dotCount++;

    if (idCount <= dotCount) {
      for (let i = 0; i < idCount; i++) {
        disk[freePos + i] = lastId;
        disk[idIndex + i] = ".";
      }
      break; //job done
    } else {
      start = freePos + dotCount; //continue search
    }
  }
  lastId--;
  // console.log(lastId);
}

let sum = 0;
for (let i = 0; i < disk.length; i++) {
  if (disk[i] == ".") continue;
  sum += disk[i] * i;
}
console.log(sum);
