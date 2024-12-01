const fs = require("fs");

const data = fs.readFileSync("day12-1-input.txt", "utf-8");
const lines = data.split("\n");

const isSame = (new_a, old_a) => {
  if (new_a.length != old_a.length) return false;
  return new_a.every((v, i) => v == old_a[i]);
};

const getDefectSeq = (pattern) => {
  const seq = [];
  let count = 0;
  for (i = 0; i < pattern.length; i++) {
    if (pattern[i] == "#") count++;
    else {
      if (count) seq.push(count);
      count = 0;
    }
  }
  if (count) seq.push(count);
  return seq;
};

const findCombinations = (pattern, defect_seq) => {
  let sum = 0;
  let question_count = (pattern.match(/\?/g) || []).length;
  let hash_count = (pattern.match(/#/g) || []).length;
  let defect_count = defect_seq.reduce((a, v) => a + v, 0);
  if (question_count == 0) return 0; //noting to do

  let qpos_a = [];
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] == "?") qpos_a.push(i);
  }
  const iterations = 2 ** question_count;
  for (let n = 0; n < iterations; n++) {
    const bstr = n.toString(2);
    const one_count = (bstr.match(/1/g) || []).length;
    if (one_count != defect_count - hash_count) continue;

    let new_pattern = pattern.slice();
    for (let i = 0; i < qpos_a.length; i++) {
      new_pattern =
        new_pattern.slice(0, qpos_a[i]) +
        (n & (1 << i) ? "#" : ".") +
        new_pattern.slice(qpos_a[i] + 1);
    }
    const new_defect_seq = getDefectSeq(new_pattern);
    // console.log(new_pattern, new_defect_seq);
    if (isSame(new_defect_seq, defect_seq)) sum++;
  }
  // console.log(pattern, defect_seq, sum);
  return sum;
};

let sum = 0;
for (const l of lines) {
  const [pattern, defect_seq_str] = l.split(" ");
  const defect_seq = defect_seq_str.split(",").map((s) => parseInt(s));
  sum += findCombinations(pattern, defect_seq);
  // break;
}

console.log(sum);
