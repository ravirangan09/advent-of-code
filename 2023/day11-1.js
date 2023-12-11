const fs = require("fs");

const data = fs.readFileSync("day11-1-input.txt", "utf-8");
const lines = data.split("\n").map((l) => l.split(""));

//scan for empty rows
const empty_row_indexes = [];
for (let i = lines.length - 1; i >= 0; i--) {
  if (!lines[i].includes("#")) empty_row_indexes.push(i);
}

for (const index of empty_row_indexes) {
  lines.splice(index + 1, 0, lines[index]);
}

//scan for empty columns

const empty_col_indexes = [];
for (let i = lines[0].length - 1; i >= 0; i--) {
  let is_found = false;
  for (let j = 0; j < lines.length && !is_found; j++)
    if (lines[j][i] == "#") is_found = true;
  if (!is_found) empty_col_indexes.push(i);
}
for (const index of empty_col_indexes) {
  for (let i = 0; i < lines.length; i++) {
    lines[i].splice(index + 1, 0, lines[i][index]);
  }
}

const pos_a = [];
for (let r = 0; r < lines.length; r++) {
  for (c = 0; c < lines[0].length; c++) {
    if (lines[r][c] == "#") pos_a.push([r, c]);
  }
}

const gcount = pos_a.length;
let sum = 0;
for (let i = 0; i < gcount; i++) {
  for (let j = i + 1; j < gcount; j++) {
    //compare i and j
    sum +=
      Math.abs(pos_a[j][0] - pos_a[i][0]) + Math.abs(pos_a[j][1] - pos_a[i][1]);
  }
}

console.log(sum);
