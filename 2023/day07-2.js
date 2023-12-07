const fs = require("fs");

const data = fs.readFileSync("day07-1-input-sample.txt", "utf-8");
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
  const d = l[0].split(""); //convert to array
  m = new Map();
  for (const v of d) m.set(v, m.has(v) ? m.get(v) + 1 : 1);
  //determine type first
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
  sb.push({ cards: l[0], score: parseInt(l[1]), type: t });
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
console.log(sb.slice(900));
const score = sb.reduce((a, v, i) => a + v.score * (i + 1), 0);
console.log(score);
