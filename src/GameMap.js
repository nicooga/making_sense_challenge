const START = Symbol();
const GOAL = Symbol();
const UNPASSABLE = Symbol();
const PASSABLE = Symbol();

const CHAR_MAP = {
  '_': PASSABLE,
  'X': UNPASSABLE,
  'S': START,
  'G': GOAL
};

// Levels are parsed from a string for easy definition
// Spaces and other non-defined chars mean nothing.
// Each line represents a row in the map.
//
// S: the starting point
// _ (underscore): a blank space that the player can move through
// X: an unpassable wall
// G: the goal
const parse = str => {
  const rows = [];
  let start;
  let goal;

  str.split(/\n/).map(l => l.trim()).filter(l => l).forEach((line, rowIndex) => {
    const row = [];

    line.replace(/\s/g, '').split('').forEach((char, columnIndex) => {
      const cell = CHAR_MAP[char];

      if (cell === START) {
        if (start) { throw 'A level must have only one start'; }
        start = { x: rowIndex, y: columnIndex };
      }

      if (cell === GOAL) {
        if (goal) { throw 'A level must have only one goal'; }
        goal = true;
      }

      row.push(cell);
    })

    rows.push(row);
  })

  return { rows, start };
};

export default { parse, START, GOAL, UNPASSABLE, PASSABLE };
