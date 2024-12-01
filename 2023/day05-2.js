const fs = require("fs");
const queue = [];

const getLocationForSeedRange = (seed_start, seed_range, maps) => {
  let match_start = seed_start;
  let match_range = seed_range;

  for (let mi = 0; mi < maps.length; mi++) {
    const m = maps[mi];
    // console.log(m);
    let unchecked = false;
    for (const [dest, source, range] of m) {
      // console.log(dest, source, range, match);
      if (match_start >= source && match_start < source + range) {
        if (unchecked) {
          console.log("unchecked handled");
          unchecked = false;
        }
        //check if range is all within or split up
        if (match_start + match_range <= source + range) {
          // console.log("**found within**", range, match_range);
          match_start = dest + match_start - source;
        } else {
          const diff = match_start - source;
          const current_match_range = range - diff;
          const new_match_range = match_range - current_match_range;
          const new_match_start = match_start + current_match_range;
          match_range = current_match_range; //do this first
          match_start = dest + match_start - source;
          queue.push([new_match_start, new_match_range, maps.slice(mi)]);
        }
        break;
      } else {
        if (seed_start < source && seed_start + seed_range > source) {
          unchecked = true;
        }
      }
    }
    if (unchecked) console.log("did not handle unchecked");
    // console.log("match ", is_found, match_start, match_range);
  }
  return match_start;
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

for (i = 0; i < seeds.length; i += 2) {
  queue.push([seeds[i], seeds[i + 1], maps]);
}

let min_loc = Infinity;
while (true) {
  if (queue.length == 0) break;
  //console.log("q ", queue.length);
  const [seed_start, seed_range, maps] = queue.shift();
  const r = getLocationForSeedRange(seed_start, seed_range, maps);
  if (r < min_loc) min_loc = r;
}
console.log(min_loc);
