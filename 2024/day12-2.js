const FS = require("node:fs");

const data = FS.readFileSync("day12-input.txt", "utf-8");
const cArray = data.split("\n").map((l) => l.split(""));

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getLineNames = (row, col) => {
  return [
    { lbl: row + ":" + col + ":" + row + ":" + (col + 1), dir: "top" },
    {
      lbl: row + ":" + (col + 1) + ":" + (row + 1) + ":" + (col + 1),
      dir: "right",
    },
    {
      lbl: row + 1 + ":" + col + ":" + (row + 1) + ":" + (col + 1),
      dir: "bottom",
    },
    { lbl: row + ":" + col + ":" + (row + 1) + ":" + col, dir: "left" },
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
            if (la.some((l) => r.lines.find((line) => line.lbl == l.lbl))) {
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
    r.lines.sort((a, b) => a.lbl.localeCompare(b.lbl));
    const v = r.lines.filter((l, i, a) => {
      if (i > 0 && l.lbl == a[i - 1].lbl) return false;
      if (i < a.length - 1 && l.lbl == a[i + 1].lbl) return false;
      return true;
    });
    r.lines = v;
  });
  return regions;
};

const countLines = (r) => {
  r.lines.forEach((l) => (l.vrt = l.lbl.split(":").map((s) => parseInt(s))));

  const hl = r.lines
    .filter((l) => l.vrt[0] == l.vrt[2])
    .sort((a, b) =>
      a.vrt[0] == b.vrt[0] ? a.vrt[1] - b.vrt[1] : a.vrt[0] - b.vrt[0]
    );

  let hcount = 1;
  let hprev = hl[0];
  for (let i = 1; i < hl.length; i++) {
    const hc = hl[i];
    if (
      hc.dir != hprev.dir ||
      hc.vrt[0] != hprev.vrt[0] ||
      hc.vrt[1] != hprev.vrt[1] + 1
    ) {
      hcount++;
    }
    hprev = hl[i];
  }

  const vl = r.lines
    .filter((l) => l.vrt[1] == l.vrt[3])
    .sort((a, b) =>
      a.vrt[1] == b.vrt[1] ? a.vrt[0] - b.vrt[2] : a.vrt[1] - b.vrt[3]
    );

  let vcount = 1;
  let vprev = vl[0];
  for (let i = 1; i < vl.length; i++) {
    const vc = vl[i];
    if (
      vc.dir != vprev.dir ||
      vc.vrt[1] != vprev.vrt[3] ||
      vc.vrt[0] != vprev.vrt[0] + 1
    ) {
      vcount++;
    }
    vprev = vl[i];
  }

  // console.log(r.c, hcount, vcount);
  r.lc = hcount + vcount;
};

const allRegions = [];
for (const c of chars) {
  allRegions.push(...setRegions(c));
}

for (const r of allRegions) {
  countLines(r);
}
console.log(allRegions.reduce((a, r) => a + r.count * r.lc, 0));
