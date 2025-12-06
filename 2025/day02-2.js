const FS = require("node:fs");

const line = FS.readFileSync("day02-input.txt", "utf-8");
const data = line.split(",").map((str) => str.split("-"));

const splitEvery = (str, n) => {
  let result = [];
  for (let i = 0; i < str.length; i += n) {
    result.push(str.slice(i, i + n));
  }
  return result;
};

console.log(data);
let count = BigInt(0);
for (const [ls, rs] of data) {
  const ln = BigInt(ls);
  const rn = BigInt(rs);
  for (let num = ln; num <= rn; num++) {
    const s = num.toString();
    const len = s.length;

    for (let i = 1; i <= Math.floor(len / 2); i++) {
      const a = splitEvery(s, i);
      // console.log(a);
      if (a.every((v) => v == a[0])) {
        console.log(a);
        count += num;
        break; //break out as it can get counted twice for e.g 222222
      }
    }
  }
}

console.log(count);
