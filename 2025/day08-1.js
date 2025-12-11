const FS = require("node:fs");

const lines = FS.readFileSync("day08-input.txt", "utf-8");
const data = lines
  .split("\n")
  .filter((l) => l.length)
  .map((l) => l.split(",").map((s) => parseInt(s)));

// console.log(data);

const lineDistance = (p1, p2) =>
  Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2 + (p1[2] - p2[2]) ** 2);
const pointCount = data.length;
const distanceArray = [];

for (let i = 0; i < pointCount - 1; i++) {
  for (j = i + 1; j < pointCount; j++) {
    distanceArray.push({ i, j, d: lineDistance(data[i], data[j]) });
  }
}

const shortestArray = distanceArray.sort((a, b) => a.d - b.d).slice(0, 1000);
console.log(shortestArray);

const circuits = [];
const lookup = new Map();
for (const c of shortestArray) {
  if (lookup.has(c.i)) {
    if (lookup.has(c.j)) {
      //merge both and remove one
      const jIndex = lookup.get(c.j);
      const iIndex = lookup.get(c.i);
      if (iIndex == jIndex) continue; //nothing to do
      const iSet = circuits[iIndex];
      const jSet = circuits[jIndex];
      for (const v of jSet.values()) {
        iSet.add(v);
        lookup.set(v, iIndex);
      }
      //kill j circuit
      circuits[jIndex] = null;
    } else {
      const index = lookup.get(c.i);
      circuits[index].add(c.j);
      lookup.set(c.j, index);
    }
  } else {
    //c.i not present
    //check c.j
    if (lookup.has(c.j)) {
      //then add c.i to c.j set
      const index = lookup.get(c.j);

      circuits[index].add(c.i);
      lookup.set(c.i, index);
    } else {
      //both not present, add new circuit
      const index = circuits.length;
      lookup.set(c.i, index);
      lookup.set(c.j, index);
      circuits.push(new Set([c.i, c.j]));
    }
  }
}

const sizes = circuits
  .filter((s) => s !== null)
  .map((s) => s.size)
  .sort((a, b) => b - a);
console.log(sizes[0] * sizes[1] * sizes[2]);
