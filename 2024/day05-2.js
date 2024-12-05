const FS = require("node:fs");

const data = FS.readFileSync("day05-input.txt", "utf-8");
const lines = data.split("\n");
const blankIndex = lines.findIndex((s) => s.length == 0);
// console.log(blankIndex);
const rules = lines.slice(0, blankIndex);
// console.log(rules);
const jobs = lines.slice(blankIndex + 1);
// console.log(jobs);

const fixJob = (na) => {
  let mismatch = false;
  let pos = -1;
  for (let i = 0; i < na.length - 1; i++) {
    const key = na[i] + "|" + na[i + 1];
    if (!rules.includes(key)) {
      mismatch = true;
      pos = i;
      break;
    }
  }
  if (!mismatch) return na;
  const new_na = [...na];
  //swap and check
  new_na[pos] = na[pos + 1];
  new_na[pos + 1] = na[pos];
  return fixJob(new_na);
};

let sum = 0;
for (let j of jobs) {
  const na = j.split(",");
  //   console.log(na);
  let mismatch = false;
  for (let i = 0; i < na.length - 1; i++) {
    const key = na[i] + "|" + na[i + 1];
    if (!rules.includes(key)) {
      mismatch = true;
      break;
    }
  }
  if (mismatch) {
    const new_na = fixJob(na);
    const mid = Math.floor(new_na.length / 2);
    sum += parseInt(new_na[mid]);
  }
}

console.log(sum);
