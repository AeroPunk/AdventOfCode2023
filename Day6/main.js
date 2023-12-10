const { testInput, realInput } = require('./input');

const durations = realInput.split(/\r?\n/)[0].split(/\s+/i);
const distances = realInput.split(/\r?\n/)[1].split(/\s+/i)

const races = durations.map((x, index) => {
    return {
        duration: x,
        distance: distances[index]
    }
})

let scorePart1 = 1;

races.forEach(race => {
    let possibleOptions = 0;
    for (let i = 0; i < race.duration; i++) {
        if (i * (race.duration - i) > race.distance) {
            possibleOptions++;
        }
    }

    if (possibleOptions) {
        scorePart1 *= possibleOptions;
    }
})

console.log(scorePart1)

const durationPart2 = +realInput.split(/\r?\n/)[0].split(/\s+/i).join('');
const distancePart2 = +realInput.split(/\r?\n/)[1].split(/\s+/i).join('');

let possibleOptionsPart2 = 0;
for (let i = 0; i < durationPart2; i++) {
    if (i * (durationPart2 - i) > distancePart2) {
        possibleOptionsPart2++;
    }
}

console.log(possibleOptionsPart2)
