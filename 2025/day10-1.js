const FS = require("node:fs");
//idea taken from https://github.com/shahata/adventofcode-solver/blob/main/src/2025/day10.js
const { powerSet } = require("combinatorial-generators");

const data = FS.readFileSync("day10-input.txt", "utf-8");
const lines = data.split("\n").filter((l) => l.length);

const getMinSteps = (lightStr, wiringStrings) => {
  const lights = lightStr
    .slice(1, -1)
    .split("")
    .reduce((a, s, i) => (s == "#" ? a | (1 << i) : a), 0);

  const wirings = wiringStrings.map((s) =>
    s
      .slice(1, -1)
      .split(",")
      .map((s) => parseInt(s))
      .reduce((a, t) => a | (1 << t), 0)
  );
  if (wirings.includes(lights)) {
    return 1;
  }

  const allCombs = [...powerSet(wirings)];

  for (const c of allCombs) {
    if (!c.length) continue;
    const r = c.reduce((a, v) => a ^ v);
    if (r == lights) {
      return c.length;
    }
  }
};

let count = 0;
for (const l of lines) {
  const [lightStr, ...wiringStrings] = l.split(" ");
  const joltageStr = wiringStrings.pop();
  count += getMinSteps(lightStr, wiringStrings);
}

console.log("count ", count);
