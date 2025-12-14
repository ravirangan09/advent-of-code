const FS = require("node:fs");

const lines = FS.readFileSync("day09-input.txt", "utf-8");
const data = lines
  .split("\n")
  .filter((l) => l.length)
  .map((l) => l.split(",").map((s) => parseInt(s)));

console.log(data.length);
//get left top
const leftTops = data
  .sort((a, b) => (a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]))
  .slice(0, 500);

const rightBottoms = data
  .sort((a, b) => (a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]))
  .slice(-500);

let maxArea = 0;
for (let i = 0; i < leftTops.length - 1; i++) {
  for (let j = i + 1; j < leftTops.length; j++) {
    const lt = leftTops[i];
    const rb = rightBottoms[j];
    const area = (rb[0] - lt[0] + 1) * (rb[1] - lt[1] + 1);
    if (area > maxArea) {
      maxArea = area;
    }
  }
}

console.log(maxArea);
