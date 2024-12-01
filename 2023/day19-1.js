const fs = require("fs");
const data = fs.readFileSync("day19-1-input.txt", "utf-8");
const lines = data.split("\n");

//process rules
const all_rules = {};

for (const l of lines) {
  if (l.length == 0) break;
  const reg = /(\w+){(.*)}/;
  const m = l.match(reg);
  const name = m[1];
  const rules = m[2].split(",");
  const rule_defs = [];
  for (const r of rules) {
    if (r.includes(":")) {
      const [condition, name] = r.split(":");
      rule_defs.push({
        key: condition[0],
        operator: condition[1],
        value: parseInt(condition.slice(2)),
        name,
      });
    } else rule_defs.push({ name: r });
  }

  all_rules[name] = rule_defs;
}

// console.log(all_rules);
//process parts and ratings
const parts = [];
const preg = /{(.*)}/;
for (const l of lines) {
  if (l[0] != "{") continue;
  const m = l.match(preg);
  const fields = m[1].split(",");
  const o = {};
  for (const f of fields) {
    const [name, value_str] = f.split("=");
    o[name] = parseInt(value_str);
  }
  parts.push(o);
}

//process parts
const doFlow = (part, test_name) => {
  for (const rule of all_rules[test_name]) {
    if ("key" in rule) {
      const result =
        rule.operator == "<"
          ? part[rule.key] < rule.value
          : part[rule.key] > rule.value;
      if (!result) continue;
    }
    if (rule.name == "A" || rule.name == "R") return rule.name;
    return doFlow(part, rule.name);
  }
};

let sum = 0;
for (const p of parts) {
  const r = doFlow(p, "in");
  if (r == "A") {
    sum += Object.values(p).reduce((a, v) => a + v, 0);
  }
}

console.log(sum);
