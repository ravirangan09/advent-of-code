const fs = require("fs");

const getLocationForSeed = (seed, maps) => {
  let match = seed;
  for (const m of maps) {
    let is_found = false;
    for (const [dest, source, range] of m) {
      // console.log(dest, source, range, match);
      if (match >= source && match < source + range) {
        match = dest + match - source;
        is_found = true;
        break;
      }
    }
    // console.log("match ", is_found, match);
  }
  return match;
};

const data = fs.readFileSync("day05-1-input.txt", "utf-8");
const lines = data.split("\n");

const seeds = lines[0]
  .split(":")[1]
  .split(" ")
  .filter((s) => s.length)
  .map((s) => parseInt(s));

const maps = [];

let new_map = null;
for (let i = 1; i < lines.length; i++) {
  const currentLine = lines[i];
  if (currentLine.length == 0) continue;
  if (currentLine.includes("map:")) {
    if (new_map) maps.push(new_map);
    new_map = [];
    continue;
  }
  const row = currentLine.split(" ").map((s) => parseInt(s));
  new_map.push(row);
}
//last map to be pushed
maps.push(new_map);

let min_loc = Infinity;
for (const s of seeds) {
  const r = getLocationForSeed(s, maps);
  if (r < min_loc) min_loc = r;
}
console.log(min_loc);
