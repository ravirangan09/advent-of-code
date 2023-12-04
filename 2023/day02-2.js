const fs = require("fs");

const data = fs.readFileSync("day02-1-input.txt", "utf-8");
const lines = data.split("\n");
let sum = 0;

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (!l.length) continue;
  const rounds = l.split(":")[1].split(";");
  const rexp = /\d+ (red|green|blue)/g;
  let max_r = 0;
  let max_g = 0;
  let max_b = 0;
  rounds.forEach((r) => {
    const m = r.match(rexp);
    m.forEach((phrase) => {
      const [countStr, color] = phrase.split(" ");
      const count = parseInt(countStr);
      if (color == "red" && count > max_r) max_r = count;
      if (color == "green" && count > max_g) max_g = count;
      if (color == "blue" && count > max_b) max_b = count;
    });
  });
  sum += max_r * max_g * max_b;
}
console.log(sum);
