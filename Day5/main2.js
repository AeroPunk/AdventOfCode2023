const { testInput, realInput } = require('./input');

const formattedInput = realInput.split(/\r?\n/).filter(x => !!x);

const seeds = formattedInput[0].split(': ')[1].split(/\s+/i).map(x => +x)
const seedToSoil = getMap('seed-to-soil map:', 'soil-to-fertilizer map:');
const soilToFertilizer = getMap('soil-to-fertilizer map:', 'fertilizer-to-water map:');
const fertilizerToWater = getMap('fertilizer-to-water map:', 'water-to-light map:');
const waterToLight = getMap('water-to-light map:', 'light-to-temperature map:');
const lightToTemperature = getMap('light-to-temperature map:', 'temperature-to-humidity map:');
const temperatureToHumidity = getMap('temperature-to-humidity map:', 'humidity-to-location map:');
const humidityToLocation = getMap('humidity-to-location map:');

const seedPairs = [];

for (let i = 0; i < seeds.length; i += 2) {
    let pair = [seeds[i], seeds[i + 1]];
    seedPairs.push(pair);
}

const seedPairsLenght = seedPairs.length;

let lowestLocation = false;

seedPairs.forEach((pair, index) => {
    console.log(`Processing seed pair ${index+1} of ${seedPairsLenght}`)
    for (let seed = pair[0]; seed < pair[0]+pair[1]; seed++) {
        const seedLocation = processNumber(seed);
        if (lowestLocation) {
            lowestLocation = lowestLocation <= seedLocation ? lowestLocation : seedLocation;
        } else {
            lowestLocation = seedLocation;
        }
    }
})

console.log(lowestLocation);

function getMap(mapName, nextMap = false) {
    return formattedInput
                .slice(
                    formattedInput.findIndex(x => x === mapName) + 1, 
                    (nextMap ? formattedInput.findIndex(x => x === nextMap) : undefined)
                )
                .map(x => {
                    return x.split(' ').map(y => +y)
                })
}

function getDestinationFromMap(number, map) {
    for (const line of map) {
        if (line[1] <= number && number <= line[1] + line[2]) {
            return line[0] + (number - line[1]);
        };
    };

    return number;
}

function processNumber(seed) {
    const soil = getDestinationFromMap(seed, seedToSoil);
    const fertilizer = getDestinationFromMap(soil, soilToFertilizer);
    const water = getDestinationFromMap(fertilizer, fertilizerToWater);
    const light = getDestinationFromMap(water, waterToLight);
    const temperature = getDestinationFromMap(light, lightToTemperature);
    const humidity = getDestinationFromMap(temperature, temperatureToHumidity);
    const location = getDestinationFromMap(humidity, humidityToLocation);
    return location;
}