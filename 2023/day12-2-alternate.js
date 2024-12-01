const fs = require("fs");

const data = fs.readFileSync("day12-1-input.txt", "utf-8");
const lines = data.split("\n");

// took help from
// https://www.reddit.com/r/adventofcode/comments/18hbbxe/2023_day_12python_stepbystep_tutorial_with_bonus/

const countArrangements = (record, groups) => {
  let out = 0;

  const current_char = record[0];
  const current_group_count = groups[0];

  if (groups.length == 0) {
    return record.includes("#") ? 0 : 1;
  }

  // console.log(record, groups);
  if (record.length == 0) return 0;
  // We just skip over the dot looking for the next pound
  const dot = () => countArrangements(record.slice(1), groups);

  const pound = () => {
    //check if
    if (current_group_count > 1) {
      let str = record.slice(0, current_group_count);
      str = str.replaceAll("?", "#");
      const check_str = "#".repeat(current_group_count);
      if (str != check_str) return 0;
    }

    //this is is the last section of record
    if (record.length == current_group_count) {
      //if last group, return one, else more groups so cannot make it work
      return groups.length == 1 ? 1 : 0;
    }
    //if next char after this group is ? or . process it
    if (
      record[current_group_count] == "?" ||
      record[current_group_count] == "."
    )
      return countArrangements(
        record.slice(current_group_count + 1),
        groups.slice(1)
      );

    //it is a # so cannot make it work
    return 0;
  };

  if (current_char == "#") out = pound();
  else {
    if (current_char == ".") out = dot();
    else out = dot() + pound();
  }

  return out;
};

let sum = 0;
for (const l of lines) {
  const [record, groups_str] = l.split(" ");
  const expanded_record = new Array(5).fill(record).join("?");
  const expanded_groups_str = new Array(5).fill(groups_str).join(",");

  const expanded_groups = expanded_groups_str
    .split(",")
    .map((s) => parseInt(s));
  sum += countArrangements(expanded_record, expanded_groups);
  console.log(sum);
}
console.log(sum);
