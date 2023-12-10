const fs = require("fs");

const data = fs.readFileSync("day10-1-input.txt", "utf-8");
const lines = data.split("\n").map((l) => l.split(""));

//first find start row
let start_row = lines.findIndex((l) => l.includes("S"));
let start_col = lines[start_row].indexOf("S");

let loop_complete = false;

const NS = "|";
const EW = "-";
const NE = "L";
const NW = "J";
const SW = "7";
const SE = "F";
const GROUND = ".";
//determine first step by checking four directions
let current_row = start_row;
let current_col = start_col;
let current_direction = 0;

const MOVE_NORTH = 1;
const MOVE_SOUTH = 2;
const MOVE_EAST = 3;
const MOVE_WEST = 4;

const getNextRowCol = (direction) => {
  switch (direction) {
    case MOVE_EAST:
      current_col++;
      break;
    case MOVE_WEST:
      current_col--;
      break;
    case MOVE_NORTH:
      current_row--;
      break;
    case MOVE_SOUTH:
      current_row++;
      break;
  }
};

const getNextDirection = (c, direction) => {
  let next_direction = 0;
  switch (direction) {
    case MOVE_EAST:
      if (c == EW) {
        next_direction = MOVE_EAST;
      }
      if (c == NW) {
        next_direction = MOVE_NORTH;
      }
      if (c == SW) {
        next_direction = MOVE_SOUTH;
      }
      break;
    case MOVE_WEST:
      if (c == EW) {
        next_direction = MOVE_WEST;
      }
      if (c == NE) {
        next_direction = MOVE_NORTH;
      }
      if (c == SE) {
        next_direction = MOVE_SOUTH;
      }
      break;
    case MOVE_NORTH:
      if (c == NS) {
        next_direction = MOVE_NORTH;
      }
      if (c == SE) {
        next_direction = MOVE_EAST;
      }
      if (c == SW) {
        next_direction = MOVE_WEST;
      }
      break;
    case MOVE_SOUTH:
      if (c == NS) {
        next_direction = MOVE_SOUTH;
      }
      if (c == NE) {
        next_direction = MOVE_EAST;
      }
      if (c == NW) {
        next_direction = MOVE_WEST;
      }
      break;
  }
  return next_direction;
};

console.log(current_row, current_col);
//west
if (current_col > 0) {
  const c = lines[current_row][current_col - 1];
  if (c == EW || c == NE || c == SE) {
    current_direction = MOVE_WEST;
  }
}

//north
if (!current_direction && current_row > 0) {
  const c = lines[current_row - 1][current_col];
  if (c == NS || c == SW || c == SE) {
    current_direction = MOVE_NORTH;
  }
}

//east
if (!current_direction && current_col < lines[0].length) {
  const c = lines[current_row][current_col + 1];
  if (c == EW || c == NW || c == SW) {
    current_direction = MOVE_EAST;
  }
}

if (!current_direction)
  throw Error("No initial direction found. something wrong!");
getNextRowCol(current_direction);

let step = 1;
while (!loop_complete) {
  c = lines[current_row][current_col];
  current_direction = getNextDirection(c, current_direction);
  getNextRowCol(current_direction);
  step++;
  if (current_row == start_row && current_col == start_col) break; //reached loop start
}

console.log(step, step / 2);
