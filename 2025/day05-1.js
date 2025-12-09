const FS = require("node:fs");

const lines = FS.readFileSync("day05-input.txt", "utf-8");
const data = lines.split("\n");

const blankPos = data.findIndex((l) => l.length == 0);
const rangeLines = data
  .slice(0, blankPos)
  .map((s) => s.split("-"))
  .map((a) => a.map((s) => BigInt(s)));

const idLines = data.slice(blankPos + 1, data.length - 1).map((s) => BigInt(s));

console.log(idLines.at(-1));
let count = 0;

for (const id of idLines) {
  if (rangeLines.some(([lv, uv]) => id >= lv && id <= uv)) count++;
}

console.log(count);
