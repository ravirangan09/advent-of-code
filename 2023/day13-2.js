const fs = require("fs");

const data = fs.readFileSync("day13-1-input.txt", "utf-8");
const lines = data.split("\n");

const getVertMirror = (g) => {
  const total_column_count = g[0].length;
  const max_columns = Math.floor(total_column_count / 2);

  for (let col_count = max_columns; col_count >= 1; col_count--) {
    for (let col = 0; col < total_column_count - col_count; col++) {
      if (col + 2 * col_count == total_column_count || col == 0) {
        //only for proper reflection
        let error_count = 0;
        g.forEach((row_data) => {
          const left = row_data.slice(col, col + col_count);
          const right = row_data
            .slice(col + col_count, col + col_count + col_count)
            .reverse();
          left.forEach((r, i) => (error_count += r == right[i] ? 0 : 1));
        });
        if (error_count == 1) return col + col_count; //proper reflection
      }
    }
  }
  return 0;
};

const getHorizMirror = (g) => {
  const total_row_count = g.length;
  const max_rows = Math.floor(total_row_count / 2);

  for (let row_count = max_rows; row_count >= 1; row_count--) {
    for (let row = 0; row < total_row_count - row_count; row++) {
      if (row + 2 * row_count == total_row_count || row == 0) {
        let error_count = 0;
        for (let c = 0; c < g[0].length; c++) {
          const top = g.slice(row, row + row_count).map((r) => r[c]);
          const bottom = g
            .slice(row + row_count, row + row_count + row_count)
            .map((r) => r[c])
            .reverse();
          top.forEach((v, i) => (error_count += v == bottom[i] ? 0 : 1));
        }
        if (error_count == 1) {
          return row + row_count;
        }
      }
    }
  }
  return 0;
};

const grids = [];
let new_grid = [];
for (const l of lines) {
  if (l.length == 0) {
    grids.push(new_grid);
    new_grid = [];
  } else new_grid.push(l.split(""));
}
grids.push(new_grid);

let sum = 0;
for (const g of grids) {
  const left_count = getVertMirror(g);
  const top_count = getHorizMirror(g);
  console.log(left_count, top_count);
  sum += top_count * 100 + left_count;
}

console.log(sum);
