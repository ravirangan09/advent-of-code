var minCut = require("minimum-cut").default;

const fs = require("fs");
const data = fs.readFileSync("day25-1-input-sample.txt", "utf-8");

let node_names = [];
const edge_list = [];
data.split("\n").forEach((line) => {
  const [name, children_str] = line.split(":");
  const children = children_str.trim().split(" ");
  node_names.push(name, ...children);
  children.forEach((child) => edge_list.push([name, child]));
});

node_names = node_names.filter((v, i, a) => a.indexOf(v) === i);
console.log(edge_list);

const r = minCut(node_names, edge_list);
console.log(r);
