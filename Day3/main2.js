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

let score = 0;

schematic.forEach((line, index) => {
  for (let x = 0; x < line.length; x++) {
    const value = line[x];
    if (value === '*') {
      score = score + processAsterisk(x, index);
    }
  }
})

function processAsterisk(xPos, yPos) {
  const foundNumbers = [];

  if (yPos > 0) {
    for (let x = Math.max(xPos - 1, 0); x <= Math.min(xPos + 1, schematic[yPos].length - 1); x++) {
      if (Number.isInteger(schematic[yPos - 1][x])) {
        let foundNumberAbove = identifyNumber(x, yPos - 1);
        foundNumbers.push(foundNumberAbove.numberValue)
        x = foundNumberAbove.lastIndex + 1;
        continue;
      }
      x++;
    }
  }

  if (xPos > 0) {
    if (Number.isInteger(schematic[yPos][xPos - 1])) {
      let foundNumberLeft = identifyNumber(xPos - 1, yPos);
      foundNumbers.push(foundNumberLeft.numberValue);
    }
  }


  if (xPos < schematic[yPos].length - 1) {
    if (Number.isInteger(schematic[yPos][xPos + 1])) {
      let foundNumberRight = identifyNumber(xPos + 1, yPos);
      foundNumbers.push(foundNumberRight.numberValue);
    }
  }

  if (yPos < schematic.length - 1) {
    for (let x = Math.max(xPos - 1, 0); x <= Math.min(xPos + 1, schematic[yPos].length - 1); x++) {
      if (Number.isInteger(schematic[yPos + 1][x])) {
        let foundNumberBelow = identifyNumber(x, yPos + 1);
        foundNumbers.push(foundNumberBelow.numberValue)
        x = foundNumberBelow.lastIndex + 1;
        continue;
      }
      x++;
    }
  }

  if (foundNumbers.length === 2) {
    return foundNumbers[0] * foundNumbers[1];
  }

  return 0;
}

function identifyNumber(xPos, yPos) {
  let numberStart = xPos;
  let numberEnd = xPos;

  if (Number.isInteger(schematic[yPos][numberStart - 1])) {
    while (Number.isInteger(schematic[yPos][numberStart])) {
      numberStart--;
    }
    numberStart++;
  }

  if (Number.isInteger(schematic[yPos][numberEnd + 1])) {
    while (Number.isInteger(schematic[yPos][numberEnd])) {
      numberEnd++;
    }
    numberEnd--;
  }

  return {
    lastIndex: numberEnd,
    numberValue: +schematic[yPos].slice(numberStart, numberEnd + 1).join('')
  }
}

console.log(score)