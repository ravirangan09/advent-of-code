const fs = require("fs");

const getWinCount = ({ time: race_time, distance }) => {
  let count = 0;
  for (let t = 1; t < race_time; t++) {
    const my_distance = (race_time - t) * t;
    if (my_distance > distance) count++;
  }
  return count;
};

const data = fs.readFileSync("day06-1-input.txt", "utf-8");
const lines = data.split("\n").map((l) =>
  l
    .split(":")[1]
    .split(" ")
    .filter((s) => s.length)
    .map((s) => parseInt(s))
);

const races = [];
for (let i = 0; i < lines[0].length; i++) {
  races.push({ time: lines[0][i], distance: lines[1][i] });
}
let solution = 1;
for (let i = 0; i < races.length; i++) {
  solution *= getWinCount(races[i]);
}
console.log(solution);
