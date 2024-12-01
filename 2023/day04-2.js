const fs = require("fs");

const data = fs.readFileSync("day04-1-input.txt", "utf-8");
const lines = data.split("\n");
let sum = 0;
let dict = {};
for (let i = 1; i <= lines.length; i++) {
  const currentLine = lines[i - 1];
  if (!currentLine.length) continue;
  const [wins, numbers] = currentLine.split(":")[1].split("|");
  // console.log(wins);
  const win_a = wins
    .split(" ")
    .filter((w) => w.length)
    .map((w) => parseInt(w));
  const num_a = numbers
    .split(" ")
    .filter((n) => n.length)
    .map((n) => parseInt(n));

  const r = win_a.filter((w) => num_a.includes(w));
  if (!(i in dict)) dict[i] = 0;
  dict[i]++;
  if (r.length) {
    for (let c = 1; c <= r.length && i + c < lines.length; c++) {
      if (!(i + c in dict)) dict[i + c] = 0;
      dict[i + c] += dict[i];
    }
  }
  // if (i != 10) break;
} //end for each line
for (const key in dict) {
  sum += dict[key];
}
console.log(sum);
