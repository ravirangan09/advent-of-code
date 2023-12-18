const fs = require("fs");
const data = fs.readFileSync("day18-1-input.txt", "utf-8");
const lines = data.split("\n");

let row = 0;
let col = 0;
let current_dir = "none";
const grid = [{ r: row, c: col, d: current_dir }];

let min_row = 0;
let max_row = -Infinity;

for (let i = 0; i < lines.length; i++) {
  const [dir, countStr, color] = lines[i].split(" ");
  const count = parseInt(countStr);
  switch (dir) {
    case "R":
      current_dir = "east";
      for (let i = 0; i < count; i++) {
        grid.push({ r: row, c: ++col, d: current_dir });
      }
      break;
    case "D":
      current_dir = "south";
      //set prev entry also as south
      grid.at(-1).d = current_dir;
      for (let i = 0; i < count; i++) {
        grid.push({ r: ++row, c: col, d: current_dir });
      }
      if (row > max_row) max_row = row;
      break;
    case "U":
      current_dir = "north";
      //set prev entry also as south
      grid.at(-1).d = current_dir;
      for (let i = 0; i < count; i++) {
        grid.push({ r: --row, c: col, d: current_dir });
      }
      if (row < min_row) min_row = row;
      break;
    case "L":
      current_dir = "west";
      for (let i = 0; i < count; i++) {
        grid.push({ r: row, c: --col, d: current_dir });
      }
      break;
  } // end switch
}

const last = grid.at(-1);

if (last.r == 0 && last.c == 0) {
  //closed loop
  grid[0].d = last.d;
  grid.pop();
} else {
  throw new Error("Not a closed loop");
}

//sort data by rows
grid.sort((a, b) => (a.r == b.r ? a.c - b.c : a.r - b.r));

let sum = 0;
for (let row = min_row; row <= max_row; row++) {
  const row_data = grid.filter((v) => v.r == row);
  //count points;
  let inside = false;
  let inside_col_start = 0;
  // console.log("row data ", row, row_data);
  for (let i = 0; i < row_data.length; i++) {
    if (row_data[i].d == "north" || row_data[i].d == "south") {
      if (!inside) {
        inside = true;
        inside_col_start = row_data[i].c;
        inside_col_dir = row_data[i].d;
      } else {
        //only if direction changes
        if (row_data[i].d != inside_col_dir) {
          //is it last column or next is further away or next is different direction
          if (
            i + 1 == row_data.length ||
            row_data[i + 1].c > row_data[i].c + 1 ||
            ((row_data[i + 1].d == "north" || row_data[i + 1].d == "south") &&
              row_data[i + 1].d != row_data[i].d)
          ) {
            inside = false;
            sum += row_data[i].c - inside_col_start + 1; //add
          }
        }
      }
    }
  }
  // console.log("s ", row, sum);
}

console.log(sum);
