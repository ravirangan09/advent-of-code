const FS = require("node:fs");

const line = FS.readFileSync("day02-input.txt", "utf-8");
const data = line.split(",").map((str) => str.split("-"));

console.log(data);
let count = BigInt(0);
for (const [ls, rs] of data) {
  if (ls.length % 2 == 1 && rs.length % 2 == 1) continue;
  const ln = BigInt(ls);
  const rn = BigInt(rs);
  for (let i = ln; i <= rn; i++) {
    const s = i.toString();
    if (s.length % 2 == 1) continue;
    if (s.slice(0, s.length / 2) == s.slice(s.length / 2)) count += i;
  }
}

console.log(count);
