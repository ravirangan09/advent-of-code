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

//check for three and t
let count = 0;
for (const nodea of s.keys()) {
  if (s.get(nodea).length >= 2) {
    const ca = s.get(nodea);
    for (const nodeb of ca) {
      if (s.has(nodeb)) {
        for (const nodec of s.get(nodeb)) {
          if (ca.includes(nodec)) {
            // console.log(nodea, nodeb, nodec);
            if ([nodea, nodeb, nodec].some((n) => n[0] == "t")) count++;
          }
        }
      }
    }
  }
}

console.log(count);
