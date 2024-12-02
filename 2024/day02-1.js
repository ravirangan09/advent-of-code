const FS = require("node:fs");

const data = FS.readFileSync("day02-input.txt", "utf-8");
const rows = data
  .split("\n")
  .map((s) => s.split(" "))
  .map((as) => as.map((v) => parseInt(v)));

let count = 0;
for (const r of rows) {
  //do various checks
  if (r[1] == r[0]) continue;
  if (r[1] > r[0]) {
    let invalid = false;
    for (let i = 1; i < r.length && !invalid; i++) {
      if (r[i] <= r[i - 1] || r[i] - r[i - 1] > 3) invalid = true;
    }
    if (invalid) continue;
  } else {
    if (r[1] < r[0]) {
      let invalid = false;
      for (let i = 1; i < r.length && !invalid; i++) {
        if (r[i] >= r[i - 1] || r[i - 1] - r[i] > 3) invalid = true;
      }
      if (invalid) continue;
    }
  }
  count++;
}

console.log(count);
