const FS = require("node:fs");

const data = FS.readFileSync("day11-input.txt", "utf-8");
let stones = data.split(" ");
console.log(stones);

const processStones = (stones) => {
  const newStones = [];
  for (const s of stones) {
    if (s == "0") newStones.push("1");
    else {
      if (s.length % 2 == 0) {
        newStones.push(s.slice(0, s.length / 2));
        newStones.push(parseInt(s.slice(s.length / 2)).toString());
      } else {
        newStones.push((parseInt(s) * 2024).toString());
      }
    }
  }
  return newStones;
};

for (i = 0; i < 10; i++) {
  stones = processStones(stones);
}
console.log(stones.length);
