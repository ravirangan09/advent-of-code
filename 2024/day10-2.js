const FS = require("node:fs");

const data = FS.readFileSync("day10-input.txt", "utf-8");
const cArray = data
  .split("\n")
  .map((l) => l.split(""))
  .map((a) => a.map((s) => parseInt(s)));

const zPosArray = [];

for (let r = 0; r < cArray.length; r++) {
  cArray[r].forEach((v, i) => {
    if (v == 0) zPosArray.push([r, i]);
  });
}

const countRoutes = (cr, cc, n, ninePosArray) => {
  //check all dir
  if (n == 9) {
    const key = cr + ":" + cc;
    ninePosArray.push(key);
    return true;
  }
  if (cr > 0 && cArray[cr - 1][cc] == n + 1)
    countRoutes(cr - 1, cc, n + 1, ninePosArray);
  if (cr < cArray.length - 1 && cArray[cr + 1][cc] == n + 1)
    countRoutes(cr + 1, cc, n + 1, ninePosArray);
  if (cc > 0 && cArray[cr][cc - 1] == n + 1)
    countRoutes(cr, cc - 1, n + 1, ninePosArray);
  if (cc < cArray[0].length - 1 && cArray[cr][cc + 1] == n + 1)
    countRoutes(cr, cc + 1, n + 1, ninePosArray);
  return false;
};

let sum = 0;
for (const zPos of zPosArray) {
  const ninePosArray = [];
  countRoutes(...zPos, 0, ninePosArray);
  sum += ninePosArray.length;
}

console.log(sum);
