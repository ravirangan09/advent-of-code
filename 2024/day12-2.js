const FS = require("node:fs");

const data = FS.readFileSync("day12-sample-5.txt", "utf-8");
const cArray = data.split("\n").map((l) => l.split(""));

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getLineNames = (row, col) => {
  return [
    row + ":" + col + ":" + row + ":" + (col + 1),
    row + ":" + (col + 1) + ":" + (row + 1) + ":" + (col + 1),
    row + 1 + ":" + col + ":" + (row + 1) + ":" + (col + 1),
    row + ":" + col + ":" + (row + 1) + ":" + col,
  ];
};

const setRegions = (c) => {
  const regions = [];
  for (let row = 0; row < cArray.length; row++) {
    for (let col = 0; col < cArray[0].length; col++) {
      if (cArray[row][col] == c) {
        if (!regions.length) {
          const s = getLineNames(row, col);
          regions.push({ c, count: 1, lines: s });
        } else {
          const mergeRegionArray = [];
          const la = getLineNames(row, col);
          regions.forEach((r, i) => {
            if (la.some((l) => r.lines.includes(l))) {
              mergeRegionArray.push(i);
            }
          });
          if (!mergeRegionArray.length) {
            //create new region
            regions.push({ c, count: 1, lines: la });
          } else {
            if (mergeRegionArray.length > 0) {
              // if (c == "J") console.log("mul ", row, col);
              //merge arrays and remove older regions
              const baseRegion = regions[mergeRegionArray[0]];
              baseRegion.count++;
              baseRegion.lines.push(...la);
              for (i = 1; i < mergeRegionArray.length; i++) {
                const mRegion = regions[mergeRegionArray[i]];
                baseRegion.lines.push(...mRegion.lines);
                baseRegion.count += mRegion.count;
              }
              //remove merged regions
              for (let i = mergeRegionArray.length - 1; i > 0; i--)
                regions.splice(mergeRegionArray[i], 1);
            }
          }
        }
      }
    }
  }
  regions.forEach((r) => {
    r.lines.sort((a, b) => a.localeCompare(b));
    const v = r.lines.filter((l, i, a) => {
      if (i > 0 && l == a[i - 1]) return false;
      if (i < a.length - 1 && l == a[i + 1]) return false;
      return true;
    });
    r.lines = v;
  });
  return regions;
};

const allRegions = [];
for (const c of chars) {
  allRegions.push(...setRegions(c));
}

const countLines = (r) => {
  const la = r.lines.map((l) => l.split(":").map((s) => parseInt(s)));
  //need rework
  const hl = la
    .filter((l) => l[0] == l[2])
    .sort((a, b) => (a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]));

  let hcount = 1;
  let hprev = hl[0];
  if (r.c == "C") console.log(hl);
  for (let i = 1; i < hl.length; i++) {
    const hc = hl[i];
    if (hc[0] != hprev[0] || hc[1] != hprev[1] + 1) {
      hcount++;
    }
    hprev = hl[i];
  }

  const vl = la
    .filter((l) => l[1] == l[3])
    .sort((a, b) => (a[1] == b[1] ? a[0] - b[0] : a[1] - b[1]));

  let vcount = 1;
  let vprev = vl[0];
  for (let i = 1; i < vl.length; i++) {
    const vc = vl[i];
    if (vc[1] != vprev[1] || vc[0] != vprev[0] + 1) {
      vcount++;
    }
    vprev = vl[i];
  }
  console.log(hcount, vcount);
  r.lc = hcount + vcount;
};

for (const r of allRegions) {
  countLines(r);
}
// console.log(allRegions);
console.log(allRegions.reduce((a, r) => a + r.count * r.lc, 0));
