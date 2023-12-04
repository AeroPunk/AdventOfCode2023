const { testInput, realInput } = require('./input');

const schematic = [];

realInput.split(/\r?\n/).forEach(line => {
  schematic.push(line.split('').map(char => {
    if (char === '.') {
      return char
    } else if (!isNaN(char)) {
      return +char
    } else if (char === '*') {
      return char
    } else {
      return '#'
    }
  }))
})

schematic.forEach(line => {
  console.log(line.join(''))
})

let score = 0;

schematic.forEach((line, index) => {
  for (let x = 0; x < line.length;) {
    const value = line[x];
    if (Number.isInteger(value)) {
      x = x + processNumber(x, index);
      continue;
    }
    x++;
  }
})

function processNumber(xPos, yPos) {
  const numberStart = xPos;
  let numberEnd = xPos;
  while (Number.isInteger(schematic[yPos][numberEnd])) {
    numberEnd++
  }
  numberEnd--;

  const numberValue = +schematic[yPos].slice(numberStart, numberEnd + 1).join('');

  if (yPos > 0) {
    for (let x = Math.max(numberStart - 1, 0); x < Math.min(numberEnd + 2, schematic[yPos].length - 1); x++) {
      if (schematic[yPos - 1][x] === '#' || schematic[yPos - 1][x] === '*') {
        score = score + numberValue;
        return numberEnd + 1 - numberStart;
      }
    }
  }

  if (numberStart > 0) {
    if (schematic[yPos][numberStart - 1] === '#' || schematic[yPos][numberStart - 1] === '*') {
      score = score + numberValue;
      return numberEnd + 1 - numberStart;
    }
  }

  if (numberEnd < schematic[yPos].length - 1) {
    if (schematic[yPos][numberEnd + 1] === '#' || schematic[yPos][numberEnd + 1] === '*') {
      score = score + numberValue;
      return numberEnd + 1 - numberStart;
    }
  }

  if (yPos < schematic.length - 1) {
    for (let y = Math.max(numberStart - 1, 0); y < Math.min(numberEnd + 2, schematic[yPos].length - 1); y++) {
      if (schematic[yPos + 1][y] === '#' || schematic[yPos + 1][y] === '*') {
        score = score + numberValue;
        return numberEnd + 1 - numberStart;
      }
    }
  }

  return numberEnd + 1 - numberStart;
}

console.log(score)
