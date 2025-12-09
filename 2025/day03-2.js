const FS = require("node:fs");

const lines = FS.readFileSync("day03-input.txt", "utf-8");
const data = lines
  .split("\n")
  .map((str) => str.split(""))
  .filter((a) => a.length);

// console.log(data);

let result = BigInt(0);
for (const bank of data) {
  const len = bank.length;
  let n = "";
  let pos = 0;
  for (let i = 11; i > 0; i--) {
    let d = bank.slice(pos, -i).reduce((a, b) => (a > b ? a : b));
    n += d;
    const m = bank.slice(pos, -i).indexOf(d);
    pos += m + 1;
  }
  const d12 = bank.slice(pos).reduce((a, b) => (a > b ? a : b));
  n += d12;
  result += BigInt(n);
}

console.log(result);
