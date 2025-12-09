const FS = require("node:fs");

const lines = FS.readFileSync("day05-sample.txt", "utf-8");
const data = lines.split("\n");

const blankPos = data.findIndex((l) => l.length == 0);
const rangeLines = data
  .slice(0, blankPos)
  .map((s) => s.split("-"))
  .map((a) => a.map((s) => BigInt(s)));

const completed = [];
const queue = structuredClone(rangeLines);
while (queue.length) {
  const [lv, uv] = queue.shift();
  let hasMatch = false;
  for (const [clv, cuv] of completed) {
    //case 1: both lv and cv within clv and cuv
    if (lv >= clv && lv <= cuv && uv <= cuv) {
      //then already added
      hasMatch = true;
      break;
    }
    //case 2: lv within but uv outside cuv
    if (lv >= clv && lv <= cuv && uv > cuv) {
      //remove duplicate within range
      queue.push([cuv + 1n, uv]);
      hasMatch = true;
      break;
    }
    //case 3: lv before clv but uv within
    if (lv < clv && uv >= clv && uv <= cuv) {
      //remove duplicate within range
      queue.push([lv, clv - 1n]);
      hasMatch = true;
      break;
    }
    //case 4: lv before clv but uv also outside
    if (lv < clv && uv > cuv) {
      //remove duplicate within range
      queue.push([lv, clv - 1n]);
      queue.push([cuv + 1n, uv]);
      hasMatch = true;
      break;
    }
  }
  if (!hasMatch) completed.push([lv, uv]);
}

console.log(completed);
const count = completed.reduce((a, v) => a + v[1] - v[0] + 1n, 0n);
console.log(count);
