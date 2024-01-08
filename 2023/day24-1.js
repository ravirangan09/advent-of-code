const fs = require("fs");
const data = fs.readFileSync("day24-1-input.txt", "utf-8");
const hailstones = data
  .split("\n")
  .map((line) => line.split("@").map((v) => v.split(",").map(Number)));

let count = 0;
for (let i = 0; i < hailstones.length - 1; i++) {
  for (let j = i + 1; j < hailstones.length; j++) {
    const [p1, v1] = hailstones[i];
    const m1 = v1[1] / v1[0]; //slope
    const c1 = p1[1] - m1 * p1[0]; //c from y = mx+c equation

    const [p2, v2] = hailstones[j];
    const m2 = v2[1] / v2[0]; //slope
    const c2 = p2[1] - m2 * p2[0]; //c from y = mx+c equation

    //intersection is m1x+c = m2x+c2
    const x = (c2 - c1) / (m1 - m2);
    const y = m1 * x + c1;

    // console.log(x, y);
    if (
      x < 200000000000000 ||
      x > 400000000000000 ||
      y < 200000000000000 ||
      y > 400000000000000
    )
      continue;
    //check is it future or past = v = d/t so t = d/v; if v negative it is past
    if ((x - p1[0]) / v1[0] < 0) continue;
    if ((x - p2[0]) / v2[0] < 0) continue;
    count++;
  }
}

console.log(count);
