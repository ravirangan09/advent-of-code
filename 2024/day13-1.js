const solve = (x1, y1, x2, y2, v1, v2) => {
  const y = (v2 * x1 - x2 * v1) / (x1 * y2 - x2 * y1);
  const x = (v1 - y1 * y) / x1;
  return [x, y];
};

const getToken = (lines) => {
  console.log(lines);
  const ma = lines[0].match(/Button A: X\+(\d+), Y\+(\d+)/);
  const mb = lines[1].match(/Button B: X\+(\d+), Y\+(\d+)/);
  const mp = lines[2].match(/Prize: X=(\d+), Y=(\d+)/);
  const values = [ma[1], mb[1], ma[2], mb[2], mp[1], mp[2]].map((s) =>
    parseInt(s)
  );
  const [x, y] = solve(...values);
  console.log(x, y);
  if (Number.isInteger(x) && Number.isInteger(y)) {
    return x * 3 + y;
  }
  return 0;
  console.log(x, y);
};

const FS = require("node:fs");

const data = FS.readFileSync("day13-input.txt", "utf-8");
const lines = data.split("\n");

const machines = [];
let count = 0;
for (let i = 0; i < lines.length; i += 4) {
  count += getToken(lines.slice(i, i + 3));
  console.log("c ", count);
}

console.log(count);
