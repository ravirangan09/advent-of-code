const fs = require("fs");

const data = fs.readFileSync("day07-1-input.txt", "utf-8");
const lines = data.split("\n").map((l) => l.split(" "));
const card_names = [
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
];
const sb = []; //scoreboard
for (const l of lines) {
  const m = new Map();
  for (const v of l[0]) m.set(v, m.has(v) ? m.get(v) + 1 : 1);

  //convert J's first
  let new_str = l[0].slice();
  if (new_str.includes("J")) {
    const values = Array.from(m.values());
    const keys = Array.from(m.keys());
    const sorted_keys = [...keys].sort(
      (a, b) => card_names.indexOf(b) - card_names.indexOf(a)
    );
    //has joker
    switch (
      m.size //unique characters
    ) {
      case 1:
        new_str = new_str.replaceAll("J", "A"); //make it highest
        break;
      case 2:
        new_str = new_str.replaceAll("J", sorted_keys[0]);
        break;
      case 3: {
        const pos = values.indexOf(3);
        if (pos >= 0) {
          if (keys[pos] == "J")
            new_str = new_str.replaceAll("J", sorted_keys[0]);
          else {
            new_str = new_str.replaceAll("J", keys[pos]);
          }
        } else {
          const pos = values.indexOf(1);
          if (keys[pos] == "J")
            new_str = new_str.replaceAll("J", sorted_keys[0]);
          else {
            //there are two Js. make it same as the other char havingtwo occurences
            for (let i = 0; i < 3; i++) {
              if (values[i] == 2 && keys[i] != "J") {
                new_str = new_str.replaceAll("J", keys[i]);
                break;
              }
            }
          }
        }
        break;
      }
      case 4: {
        const pos = values.indexOf(2);
        if (keys[pos] == "J") new_str = new_str.replaceAll("J", sorted_keys[0]);
        else {
          new_str = new_str.replaceAll("J", keys[pos]);
        }
        break;
      }
      case 5:
        new_str = new_str.replaceAll("J", sorted_keys[0]);
        break;
    }
    //clear map and recalculate counts
    m.clear();
    for (const v of new_str) m.set(v, m.has(v) ? m.get(v) + 1 : 1);
  }
  const values = Array.from(m.values());
  let t = 0;
  switch (
    m.size //unique characters
  ) {
    case 1:
      t = 7;
      break;
    case 2:
      t = values.includes(4) ? 6 : 5; //four of kind or full house
      break;
    case 3:
      t = values.includes(3) ? 4 : 3; //three of kind or two pair
      break;
    case 4:
      t = 2;
      break;
    case 5:
      t = 1;
      break;
  }
  sb.push({ cards: l[0], new_str, score: parseInt(l[1]), type: t });
}
sb.sort((a, b) => {
  if (a.type == b.type) {
    // compare positions
    for (let i = 0; i < a.cards.length; i++) {
      if (a.cards[i] == b.cards[i]) continue; //lookup next
      return card_names.indexOf(a.cards[i]) - card_names.indexOf(b.cards[i]);
    }
  } else {
    return a.type - b.type;
  }
});
const score = sb.reduce((a, v, i) => a + v.score * (i + 1), 0);
console.log(score);
