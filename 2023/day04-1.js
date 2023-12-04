const fs = require("fs");

const data = fs.readFileSync("day04-1-input.txt", "utf-8");
const lines = data.split("\n");
let sum = 0;
for (let i = 0; i < lines.length; i++) {
  const currentLine = lines[i];
  if (!currentLine.length) continue;
  const [wins, numbers] = currentLine.split(":")[1].split("|");
  console.log(wins);
  const win_a = wins
    .split(" ")
    .filter((w) => w.length)
    .map((w) => parseInt(w));
  const num_a = numbers
    .split(" ")
    .filter((n) => n.length)
    .map((n) => parseInt(n));

  const r = win_a.filter((w) => num_a.includes(w));
  console.log("r ", r);
  if (r.length) sum += 2 ** (r.length - 1);
  // if (i != 10) break;
} //end for each line
console.log(sum);
