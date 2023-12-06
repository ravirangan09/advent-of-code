const fs = require("fs");

const getWinCount = (race_time, distance) => {
  let count = 0;
  for (let t = 1; t < race_time; t++) {
    const my_distance = (race_time - t) * t;
    if (my_distance > distance) count++;
  }
  return count;
};

const data = fs.readFileSync("day06-1-input.txt", "utf-8");
const lines = data
  .split("\n")
  .map((l) => parseInt(l.split(":")[1].replaceAll(" ", "")));

const solution = getWinCount(lines[0], lines[1]);
console.log(solution);
