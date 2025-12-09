const FS = require("node:fs");

const lines = FS.readFileSync("day06-input.txt", "utf-8");
const data = lines
  .split("\n")
  .map((l) => l.split(" ").filter((s) => s.length))
  .filter((a) => a.length);

const rows = data.length;
const cols = data[0].length;

let result = 0n;
for (let c = 0; c < cols; c++) {
  const op = data[rows - 1][c];
  let v = op == "*" ? 1n : 0n;
  for (let r = 0; r < rows - 1; r++) {
    if (op == "*") v *= BigInt(data[r][c]);
    else v += BigInt(data[r][c]);
  }
  result += v;
}
console.log(result);
