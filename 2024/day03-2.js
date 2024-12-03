const FS = require("node:fs");

const data = FS.readFileSync("day03-input.txt", "utf-8");
// console.log(data);
const searchExp = /(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))/g;
const mulExp = /mul\((\d{1,3}),(\d{1,3})\)/;

const allMatches = data.matchAll(searchExp);
let sum = 0;
let allow = true;
for (const matchObj of allMatches) {
  const str = matchObj[0];
  const pos = matchObj.index;
  if (str == "do()") allow = true;
  else {
    if (str == "don't()") allow = false;
    else {
      if (allow) {
        const m = str.match(mulExp);
        const vals = m.slice(1).map((s) => parseInt(s));
        sum += vals[0] * vals[1];
      }
    }
  }
}

console.log(sum);
