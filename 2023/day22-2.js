const fs = require("fs");
const data = fs.readFileSync("day22-1-input.txt", "utf-8");
const bricks = data
  .split("\n")
  .map((line) => line.split("~").map((p) => p.split(",").map(Number)));

//find max x, y, z
let max_x = -Infinity;
let max_y = -Infinity;
let max_z = -Infinity;

for (let b of bricks) {
  if (b[1][0] > max_x) max_x = b[1][0];
  if (b[1][1] > max_y) max_y = b[1][1];
  if (b[1][2] > max_z) max_z = b[1][2];
}

//create a 3d cube
const cube = [];
for (let z = 1; z <= max_z; z++) {
  const plane = Array.from(Array(max_y + 1), () => Array(max_x + 1).fill(0));
  cube.push(plane);
}

//fill cube with brick positions
const brick_lookup = {};

for (let bi = 0; bi < bricks.length; bi++) {
  const b = bricks[bi];
  const count =
    b[1].reduce((a, v) => a + v, 0) - b[0].reduce((a, v) => a + v, 0) + 1;

  let [start_x, start_y, start_z] = b[0];
  let [end_x, end_y, end_z] = b[1];
  cube[start_z - 1][start_y][start_x] = bi + 1;
  let dir = "x";
  if (count > 1) {
    //determine direction
    for (let i = 1; i < count; i++) {
      if (start_x != end_x) {
        cube[start_z - 1][start_y][start_x + i] = bi + 1;
        dir = "x";
      }
      if (start_y != end_y) {
        cube[start_z - 1][start_y + i][start_x] = bi + 1;
        dir = "y";
      }
      if (start_z != end_z) {
        cube[start_z - 1 + i][start_y][start_x] = bi + 1;
        dir = "z";
      }
    }
  }
  brick_lookup[bi + 1] = { count, dir, start_x, start_y, start_z: start_z - 1 };
}

const fall = (cube, brick_lookup) => {
  let move_loops = 0;
  let fallen_bricks = new Set();

  while (true) {
    let has_moved = false;
    for (let z = 1; z < max_z; z++) {
      //search that plane for bricks
      const unique_brick_indexes = cube[z]
        .flat()
        .filter((c) => c != 0)
        .filter((v, i, a) => a.indexOf(v) === i);

      for (const bi of unique_brick_indexes) {
        const { count, dir, start_x, start_y, start_z } = brick_lookup[bi];
        //check if lower level can take full brick
        if (dir == "x") {
          let can_move = true;
          for (let i = 0; i < count && can_move; i++) {
            if (cube[z - 1][start_y][start_x + i] != 0) can_move = false;
          }
          if (can_move) {
            //move it
            has_moved = true;
            for (let i = 0; i < count && can_move; i++) {
              cube[z - 1][start_y][start_x + i] = cube[z][start_y][start_x + i];
              cube[z][start_y][start_x + i] = 0;
            }
            brick_lookup[bi].start_z = z - 1;
            fallen_bricks.add(bi);
          }
        }
        if (dir == "y") {
          let can_move = true;
          for (let i = 0; i < count && can_move; i++) {
            if (cube[z - 1][start_y + i][start_x] != 0) can_move = false;
          }
          if (can_move) {
            //move it
            has_moved = true;
            for (let i = 0; i < count && can_move; i++) {
              cube[z - 1][start_y + i][start_x] = cube[z][start_y + i][start_x];
              cube[z][start_y + i][start_x] = 0;
            }
            brick_lookup[bi].start_z = z - 1;
            fallen_bricks.add(bi);
          }
        }
        //if stacked cube starts at z and the one below is empty
        if (dir == "z" && start_z == z && cube[z - 1][start_y][start_x] == 0) {
          has_moved = true;
          //move it
          for (let i = 0; i < count; i++) {
            cube[z - 1 + i][start_y][start_x] = cube[z + i][start_y][start_x];
            cube[z + i][start_y][start_x] = 0;
          }
          //change brick_lookup z value two
          brick_lookup[bi].start_z = start_z - 1;
          fallen_bricks.add(bi);
        }
      } //end for
    } //end z
    if (!has_moved) break;
  } //end while
  return fallen_bricks.size;
};

fall(cube, brick_lookup, false);

// console.log(cube);
// console.log(brick_lookup);
//make each brick zero and let it fall. if no change, it can be disintegrated
let sum = 0;
for (const bi in brick_lookup) {
  const clone_cube = structuredClone(cube);
  const clone_brick_lookup = structuredClone(brick_lookup);
  let { count, dir, start_x, start_y, start_z } = brick_lookup[bi];
  for (i = 0; i < count; i++) {
    if (dir == "x") clone_cube[start_z][start_y][start_x + i] = 0;
    if (dir == "y") clone_cube[start_z][start_y + i][start_x] = 0;
    if (dir == "z") clone_cube[start_z + i][start_y][start_x] = 0;
  }
  sum += fall(clone_cube, clone_brick_lookup, true);
}
console.log(sum);
//now detect
