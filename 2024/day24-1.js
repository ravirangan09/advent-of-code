const FS = require("node:fs");
const data = FS.readFileSync("day24-input.txt", "utf-8");
const lines = data.split("\n");

const emptyLine = lines.findIndex((l) => l.length == 0);

const vars = lines.slice(0, emptyLine).reduce((h, l) => {
  const [name, valueStr] = l.split(":");
  const value = parseInt(valueStr.trim());
  h[name] = value;
  return h;
}, {});

const equations = lines.slice(emptyLine + 1).map((l) => {
  const m = l.match(/(\w+) (\w+) (\w+) -> (\w+)/);
  return Array.from(m).slice(1);
});

let zcount = 0;

while (true) {
  let complete = true;
  for (const [v1, op, v2, r] of equations) {
    if (v1 in vars && v2 in vars) {
      vars[r] =
        op == "AND"
          ? vars[v1] & vars[v2]
          : op == "OR"
          ? vars[v1] | vars[v2]
          : vars[v1] ^ vars[v2];
    } else complete = false;
  }
  if (complete) break;
}

let str = "";
for (let i = 0; i < 64; i++) {
  const name = "z" + i.toString().padStart(2, "0");
  if (name in vars) str = vars[name] + str;
  else break;
}

str = "0b" + str;
console.log(BigInt(str));
