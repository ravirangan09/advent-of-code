const fs = require("fs");

const data = fs.readFileSync("day15-1-input.txt", "utf-8");
const str_a = data.split(",");
const getHashValue = (str) => {
  let hv = 0;
  for (let i = 0; i < str.length; i++) {
    hv += str.charCodeAt(i);
    hv *= 17;
    hv = hv % 256;
  }
  return hv;
};

console.log(str_a.reduce((a, str) => a + getHashValue(str), 0));
