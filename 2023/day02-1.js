const fs = require("fs");

const data = fs.readFileSync("day02-1-input.txt", "utf-8");
const lines = data.split("\n");
let sum = 0;
const max_r = 12;
const max_g = 13;
const max_b = 14;

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (!l.length) continue;
  const id = i + 1;
  const rounds = l.split(":")[1].split(";");
  const rexp = /\d+ (red|green|blue)/g;
  if (
    rounds.every((r) => {
      const m = r.match(rexp);
      return m.every((phrase) => {
        const [countStr, color] = phrase.split(" ");
        const count = parseInt(countStr);
        if (count > 14) return false;
        if (color == "red" && count > max_r) return false;
        if (color == "green" && count > max_g) return false;
        if (color == "blue" && count > max_b) return false;
        return true;
      });
    })
  ) {
    sum += id;
  }
}
console.log(sum);
