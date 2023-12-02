const { testInput, realInput } = require('./input');

const games = [];

realInput.split(/\r?\n/).forEach(line => {
  let game = {
    'id': +line.split(':')[0].split(' ')[1],
    'redMax': 0,
    'greenMax': 0,
    'blueMax': 0
  };

  const values = line.split(':')[1].split(/[,;]+/).map(x => x.trim().split(' '));
  values.forEach(value => {
    switch (value[1]) {
      case 'red':
        game.redMax = +value[0] > game.redMax ? +value[0] : game.redMax
        break;
      case 'green':
        game.greenMax = +value[0] > game.greenMax ? +value[0] : game.greenMax
        break;
      case 'blue':
        game.blueMax = +value[0] > game.blueMax ? +value[0] : game.blueMax
        break;
      default:
        break;
    }
  })
  games.push(game)
})

let part1Answer = 0;
let part2Answer = 0;

games.forEach(game => {
  if (game.redMax <= 12 && game.greenMax <= 13 && game.blueMax <= 14) {
    part1Answer = part1Answer + game.id;
  }

  const gamePower = game.redMax * game.greenMax * game.blueMax;
  part2Answer = part2Answer + gamePower;

})

console.log(`Part 1: ${part1Answer}`)
console.log(`Part 2: ${part2Answer}`)


