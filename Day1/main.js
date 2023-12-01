const { testInput, realInput, testInput2 } = require('./input');

let totalPartOne = 0;

realInput.split(/\r?\n/).forEach(line => {
    const numbers = line.match(/\d/g);
    totalPartOne = totalPartOne + +`${numbers[0]}${numbers[numbers.length-1]}`
})

console.log(`Part One: ${totalPartOne}`)

let totalPartTwo = 0;
const numberWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];


realInput.split(/\r?\n/).forEach(line => {
    const numbers = [];
    for ( let i = 0; i < line.length; i++) {
        if (!isNaN(line[i])) {
            numbers.push(line[i])
            continue;
        }

        for ( let x = 0; x < numberWords.length; x++ ) {
            if (line.substring(i, i+numberWords[x].length) === numberWords[x]) {
                numbers.push(`${x+1}`);
                break;
            }
        }
    }
    totalPartTwo = totalPartTwo + +`${numbers[0]}${numbers[numbers.length-1]}`
})

console.log(`Part Two: ${totalPartTwo}`)
