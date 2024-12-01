const fs = require("fs");

const data = fs.readFileSync("day12-1-input.txt", "utf-8");
const lines = data.split("\n");

// Took help
// code converted from
// https://www.reddit.com/r/adventofcode/comments/18ge41g/comment/kd4ihxm/?context=3

const countArrangements = (pattern, springs) => {
  const n = pattern.length;
  const m = springs.length;
  const dp = Array.from(Array(n + 1), () => Array(m + 1).fill(0));
  dp[n][m] = 1;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      let damaged = false,
        operational = false;
      switch (pattern[i]) {
        case "#": {
          damaged = true;
          break;
        }
        case ".": {
          operational = true;
          break;
        }
        default: {
          operational = true;
          damaged = true;
        }
      }
      let sum = 0;
      if (damaged && springs[j]) {
        sum += dp[i + 1][j + 1];
      } else if (operational && !springs[j]) {
        sum += dp[i + 1][j + 1] + dp[i + 1][j];
      }
      dp[i][j] = sum;
    }
  }
  return dp[0][0];
};

let sum = 0;
for (const l of lines) {
  const [pattern, defect_seq_str] = l.split(" ");
  // const expanded_pattern = new Array(5).fill(pattern).join("?");
  // const expanded_defect_seq_str = new Array(5).fill(defect_seq_str).join(",");

  const defect_seq = defect_seq_str.split(",").map((s) => parseInt(s));
  const bool_seq = [false];
  for (const count of defect_seq) {
    for (let i = 0; i < count; i++) bool_seq.push(true);
    bool_seq.push(false);
  }
  sum += countArrangements("." + pattern + ".", bool_seq);
}
console.log(sum);
