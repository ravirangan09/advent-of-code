const fs = require("fs");

const data = fs.readFileSync("day15-1-input.txt", "utf-8");
const str_a = data.split(",");
const getHashValue = (str) => {
  let hv = 0;
  for (let i = 0; i < str.length; i++) {
    hv += str.charCodeAt(i);
    hv *= 17;
    hv = hv % 256;
  }
  return hv;
};

const boxes = Array.from(Array(256), () => Array());
for (const str of str_a) {
  let pos = str.indexOf("-");
  if (pos < 0) pos = str.indexOf("=");
  const label = str.slice(0, pos);
  const operation = str[pos];
  const focal_length = operation == "=" ? parseInt(str[pos + 1]) : 0;
  const hv = getHashValue(label);
  const box = boxes[hv];
  const lens_pos = box.findIndex((v) => v[0] == label);
  if (lens_pos < 0) {
    //not found
    if (operation == "=") box.push([label, focal_length]);
  } else {
    if (operation == "=") box[lens_pos] = [label, focal_length]; //replace
    else box.splice(lens_pos, 1);
  }
}

let sum = 0;
for (i = 0; i < boxes.length; i++) {
  const box = boxes[i];
  for (j = 0; j < box.length; j++) {
    sum += (i + 1) * (j + 1) * box[j][1];
  }
}
console.log(sum);
