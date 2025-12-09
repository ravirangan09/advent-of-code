const FS = require("node:fs");

const lines = FS.readFileSync("day06-input.txt", "utf-8");
const data = lines
  .split("\n")
  .filter((l) => l.length)
  .map((l) => l.split(""));

const rows = data.length;
const cols = data[0].length;

let result = 0n;
let numbers = [];
let op = null;
for (let c = 0; c < cols; c++) {
  let s = "";
  for (let r = 0; r < rows - 1; r++) {
    if (data[r][c] != " ") s += data[r][c];
  }
  if (s.length) {
    if (numbers.length == 0) {
      //get operator
      op = data[rows - 1][c];
    }
    numbers.push(BigInt(s));
  } else {
    //done
    let v = op == "*" ? 1n : 0n;
    v = numbers.reduce(
      (a, v) => (op == "*" ? a * BigInt(v) : a + BigInt(v)),
      v
    );
    result += v;
    numbers = [];
  }
}
let v = op == "*" ? 1n : 0n;
v = numbers.reduce((a, v) => (op == "*" ? a * BigInt(v) : a + BigInt(v)), v);
result += v;

console.log(result);
