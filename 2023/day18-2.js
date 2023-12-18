const fs = require("fs");
const data = fs.readFileSync("day18-1-input.txt", "utf-8");
const lines = data.split("\n");

// https://stackoverflow.com/questions/34326728/how-do-i-calculate-the-area-of-a-non-convex-polygon

const polygonArea = function (p) {
  //closed loop; last point same as first point
  let area = 0;
  const l = p.length;
  if (l.length < 3) return 0;
  for (let i = 0; i < l - 1; i++) {
    area += -p[i][1] * p[i + 1][0] + p[i][0] * p[i + 1][1];
  }
  return 0.5 * Math.abs(area);
};
const lookup = { 0: "R", 1: "D", 2: "L", 3: "U" };
let row = 0;
let col = 0;
const points = [[row, col]];
let perimeter = 0;
for (let i = 0; i < lines.length; i++) {
  let color = lines[i].split(" ")[2];

  const hexStr = "0x" + color.slice(2, 7);
  const count = +hexStr;
  const dir = lookup[color[7]];
  perimeter += count;
  switch (dir) {
    case "R":
      points.push([row, col + count]); //end
      col += count;
      break;
    case "D":
      points.push([row + count, col]);
      row += count;
      break;
    case "U":
      points.push([row - count, col]);
      row -= count;
      break;
    case "L":
      points.push([row, col - count]); //end
      col -= count;
      break;
  } // end switch
}

const area = polygonArea(points) + perimeter / 2 + 1; //need to figure out where this formula came from
console.log(area);
