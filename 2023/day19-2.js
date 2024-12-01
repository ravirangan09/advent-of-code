const fs = require("fs");
const data = fs.readFileSync("day19-1-input.txt", "utf-8");
const lines = data.split("\n");

// concept taken from
// https://github.com/shahata/adventofcode-solver/blob/master/src/2023/day19.js

//process rules
const all_rules = {};

for (const l of lines) {
  if (l.length == 0) break;
  const reg = /(\w+){(.*)}/;
  const m = l.match(reg);
  const flow_name = m[1];
  const rules = m[2].split(",");
  const rule_defs = [];
  for (const r of rules) {
    if (r.includes(":")) {
      const [condition, result_name] = r.split(":");
      rule_defs.push({
        key: condition[0],
        operator: condition[1],
        value: parseInt(condition.slice(2)),
        result_name,
      });
    } else rule_defs.push({ result_name: r });
  }

  all_rules[flow_name] = rule_defs;
}

const root_ranges = {
  x: { min: 1, max: 4000 },
  m: { min: 1, max: 4000 },
  a: { min: 1, max: 4000 },
  s: { min: 1, max: 4000 },
};

const doFlow = (ranges, flow_name = "in") => {
  let count = 0;
  if (flow_name == "R") return 0;
  if (flow_name == "A") {
    return Object.values(ranges).reduce((a, r) => a * (r.max - r.min + 1), 1);
  }
  for (const { key, operator, value, result_name } of all_rules[flow_name]) {
    //clone ranges
    const next_ranges = structuredClone(ranges);
    if (operator && value >= ranges[key].min && value <= ranges[key].max) {
      if (operator == "<") {
        ranges[key].min = value;
        next_ranges[key].max = value - 1;
      }
      if (operator == ">") {
        ranges[key].max = value;
        next_ranges[key].min = value + 1;
      }
    }
    count += doFlow(next_ranges, result_name);
  }
  return count;
};

console.log(doFlow(root_ranges));
