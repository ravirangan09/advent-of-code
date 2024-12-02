const FS = require("node:fs");

const checkRow = (r) => {
  let invalid = false;
  if (r[1] == r[0]) invalid = true;
  else {
    if (r[1] > r[0]) {
      for (let i = 1; i < r.length && !invalid; i++) {
        if (r[i] <= r[i - 1] || r[i] - r[i - 1] > 3) invalid = true;
      }
    } else {
      if (r[1] < r[0]) {
        for (let i = 1; i < r.length && !invalid; i++) {
          if (r[i] >= r[i - 1] || r[i - 1] - r[i] > 3) invalid = true;
        }
      }
    }
  }
  return invalid;
};

const data = FS.readFileSync("day02-input.txt", "utf-8");
const rows = data
  .split("\n")
  .map((s) => s.split(" "))
  .map((as) => as.map((v) => parseInt(v)));

let count = 0;
for (const r of rows) {
  //do various checks
  if (checkRow(r)) {
    for (let i = 0; i < r.length; i++) {
      const nr = r.slice(); //copy
      nr.splice(i, 1);
      if (!checkRow(nr)) {
        count++;
        break;
      }
    }
  } else count++;
}

console.log(count);
