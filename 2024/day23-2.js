const FS = require("node:fs");

const data = FS.readFileSync("day23-input.txt", "utf-8");
const links = data
  .split("\n")
  .map((s) => s.split("-").sort())
  .sort((a, b) =>
    a[0] == b[0] ? a[1].localeCompare(b[1]) : a[0].localeCompare(b[0])
  );

const s = new Map();
for (const [nodea, nodeb] of links) {
  if (s.has(nodea)) s.get(nodea).push(nodeb);
  else s.set(nodea, [nodeb]);
}

const listInterconnections = (nodea, s) => {
  const ca = s.get(nodea);
  let max_ic = [];
  let ab = [];
  for (const nodeb of ca) {
    if (s.has(nodeb)) {
      const cb = s.get(nodeb);

      const r = cb.filter((n) => ca.includes(n));
      if (r.length > max_ic.length) {
        max_ic = r;
        console.log("mc1 ", max_ic);
        ab = [nodea, nodeb];
      }
    }
  }

  return [...ab, ...max_ic];
};

let max_ic = [];
for (const nodea of s.keys()) {
  if (s.get(nodea).length >= 3) {
    const ic = listInterconnections(nodea, s);
    if (ic.length > max_ic.length) {
      max_ic = ic;
      console.log("mc2 ", max_ic);
      break;
    }
  }
}

console.log(max_ic.join(","));
