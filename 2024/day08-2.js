const FS = require("node:fs");

const data = FS.readFileSync("day08-input.txt", "utf-8");
const cArray = data.split("\n").map((l) => l.split(""));

const charSet =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const anPos = [];

const getAntennaPos = (c) => {
  const posArray = [];
  for (let row = 0; row < cArray.length; row++) {
    for (let col = 0; col < cArray[0].length; col++) {
      if (cArray[row][col] == c) posArray.push([row, col]);
    }
  }
  return posArray;
};

const getAntiNodes = (posArray, antennaChar) => {
  const l = posArray.length;

  const isValid = ([row, col]) => {
    if (row < 0 || row >= cArray.length) return false;
    if (col < 0 || col >= cArray[0].length) return false;
    let key = row + ":" + col;
    //unique locations
    if (!anPos.includes(key)) {
      anPos.push(key);
    }
    return true;
  };

  for (let i = 0; i < l - 1; i++) {
    for (j = i + 1; j < l; j++) {
      const dr = posArray[j][0] - posArray[i][0];
      const dc = posArray[j][1] - posArray[i][1];
      for (let m = 0; m < 100; m++) {
        const firstAN = [posArray[i][0] - dr * m, posArray[i][1] - dc * m];
        const secondAN = [posArray[j][0] + dr * m, posArray[j][1] + dc * m];
        const r1 = isValid(firstAN);
        const r2 = isValid(secondAN);
        if (!r1 && !r2) break;
      }
    }
  }
};

for (const c of charSet) {
  const posArray = getAntennaPos(c);
  if (posArray.length > 1) {
    getAntiNodes(posArray, c);
  }
}

console.log(anPos.length);
