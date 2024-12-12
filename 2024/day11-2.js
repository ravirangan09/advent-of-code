const FS = require("node:fs");

const data = FS.readFileSync("day11-input.txt", "utf-8");
let allStones = data.split(" ");

// idea https://github.com/shahata/adventofcode-solver/blob/master/src/2024/day11.js
// memoisation - nice code

const processStone = (s) => {
  if (s == "0") return ["1"];
  else {
    if (s.length % 2 == 0) {
      return [
        s.slice(0, s.length / 2),
        parseInt(s.slice(s.length / 2)).toString(),
      ];
    } else {
      return [(parseInt(s) * 2024).toString()];
    }
  }
};

const mem = new Map();
const blink = (stone, times) => {
  const key = stone + ":" + times;
  if (mem.has(key)) return mem.get(key);
  const stones = processStone(stone);
  let sum =
    times == 1
      ? stones.length
      : stones.reduce((a, s) => a + blink(s, times - 1), 0);
  mem.set(key, sum);
  return sum;
};

const count = allStones.reduce((sum, s) => sum + blink(s, 75), 0);
console.log(count);
