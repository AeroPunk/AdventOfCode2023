const { testInput, realInput } = require('./input');

const originalCards = []

realInput.split(/\r?\n/).forEach(line => {
  originalCards.push({
    cardNumber: +line.split(':')[0].split(/\s+/i)[1],
    winningNumbers: line.split(':')[1].split('|')[0].trim().split(/\s+/i),
    cardNumbers: line.split(':')[1].split('|')[1].trim().split(/\s+/i)
  });
})

let scorePart1 = 0;

originalCards.forEach(card => {
  let prizeNumbers = card.cardNumbers.filter(number => card.winningNumbers.includes(number));
  if (prizeNumbers.length) {
    let cardScore = 1;
    for (let x = 0; x < prizeNumbers.length - 1; x++) {
      cardScore *= 2
    }
    scorePart1 += cardScore;
  }
})

console.log(`Part 1: ${scorePart1}`)

const duplicatedCards = originalCards.map(card => {
  return {
    ...card,
    amount: 1
  }
});

duplicatedCards.forEach(card => {
  let prizeNumbers = card.cardNumbers.filter(number => card.winningNumbers.includes(number));
  if (prizeNumbers.length) {
    const cardsToDuplicate = [];
    for (let x = card.cardNumber + 1; x < card.cardNumber + prizeNumbers.length + 1; x++) {
      cardsToDuplicate.push(x)
    }
    for (let y = 0; y < cardsToDuplicate.length; y++) {
      duplicatedCards[duplicatedCards.findIndex(x => x.cardNumber === cardsToDuplicate[y])].amount += card.amount;
    }
  }
})

const scorePart2 = duplicatedCards.reduce((acc, currentCard) => acc + currentCard.amount, 0);

console.log(`Part 2: ${scorePart2}`)


