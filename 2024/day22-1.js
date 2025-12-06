const FS = require("node:fs");

const data = FS.readFileSync("day22-input.txt", "utf-8");
const buyers = data.split("\n").map((s) => BigInt(s));

const mix = (a, b) => a ^ b;
const prune = (a) => a % 16777216n;

const calcNext = (n) => {
  const v1 = prune(mix(n << 6n, n));
  const v2 = prune(mix(v1 >> 5n, v1));
  const v3 = prune(mix(v2 * 2048n, v2));
  return v3;
};

const getNthSecret = (n, t = 2000) => {
  for (let i = 0; i < t; i++) {
    n = calcNext(n);
  }
  return n;
};

console.log(buyers.reduce((a, b) => a + getNthSecret(b), 0n));
