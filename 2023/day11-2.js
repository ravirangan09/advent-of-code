const fs = require("fs");

const data = fs.readFileSync("day11-1-input.txt", "utf-8");
const lines = data.split("\n").map((l) => l.split(""));

//scan for empty rows
const empty_row_indexes = [];
for (let i = 0; i < lines.length; i++) {
  if (!lines[i].includes("#")) empty_row_indexes.push(i);
}

//scan for empty columns

const empty_col_indexes = [];
for (let i = 0; i < lines[0].length; i++) {
  let is_found = false;
  for (let j = 0; j < lines.length && !is_found; j++)
    if (lines[j][i] == "#") is_found = true;
  if (!is_found) empty_col_indexes.push(i);
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
    const [row1, col1] = pos_a[i];
    const [row2, col2] = pos_a[j];
    sum += Math.abs(row1 - row2) + Math.abs(col1 - col2);
    //find empty rows between row1 and row2
    if (row2 > row1)
      sum +=
        empty_row_indexes.filter((ri) => ri > row1 && ri < row2).length *
        999999;

    //find empty cols between row1 and row2
    if (col2 > col1)
      sum +=
        empty_col_indexes.filter((ci) => ci > col1 && ci < col2).length *
        999999;
    if (col2 < col1)
      sum +=
        empty_col_indexes.filter((ci) => ci > col2 && ci < col1).length *
        999999;
  }
}

console.log(sum);
