const { testInput, realInput } = require('./input');

// A hand consists of five cards labeled one of A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2. 
// The relative strength of each card follows this order, where A is the highest and 2 is the lowest.

const cardRatings = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'T': 10,
    'J': 1,
    'Q': 11,
    'K': 12,
    'A': 13
}

// Hand Ratings: Five of a kind 7, Four of a kind 6, Full house 5, Three of a kind 4, Two pairs 3, One pair 2, High card (all cards distinct) 1, no score 0

function determineHandStrength(handObject) {
    const jokerCount = handObject.cards.countedCards['J'];

    if (
        Object.keys(handObject.cards.countedCards).some(key => handObject.cards.countedCards[key] === 5) ||
        Object.keys(handObject.cards.countedCards).some(key => key !== 'J' && handObject.cards.countedCards[key] + jokerCount === 5)
        ) {
        return 7;
    } else if (
        Object.keys(handObject.cards.countedCards).some(key => handObject.cards.countedCards[key] === 4) ||
        Object.keys(handObject.cards.countedCards).some(key => key !== 'J' && handObject.cards.countedCards[key] + jokerCount === 4)
        ) {
        return 6;
    } else if (
        (Object.keys(handObject.cards.countedCards).some(key => handObject.cards.countedCards[key] === 3) && Object.keys(handObject.cards.countedCards).some(key => handObject.cards.countedCards[key] === 2)) ||
        (Object.keys(handObject.cards.countedCards).filter(key => handObject.cards.countedCards[key] === 2).length === 2 && handObject.cards.countedCards['J'] === 1)
        ) {
        return 5;
    } else if (
        Object.keys(handObject.cards.countedCards).some(key => handObject.cards.countedCards[key] === 3) ||
        Object.keys(handObject.cards.countedCards).some(key => key !== 'J' && handObject.cards.countedCards[key] + jokerCount === 3)
        ) {
        return 4;
    } else if (Object.keys(handObject.cards.countedCards).filter(key => handObject.cards.countedCards[key] === 2).length === 2) {
        return 3;
    } else if (
        Object.keys(handObject.cards.countedCards).filter(key => handObject.cards.countedCards[key] === 2).length === 1 ||
        (Object.keys(handObject.cards.countedCards).filter(key => handObject.cards.countedCards[key] === 1).length === 5 && handObject.cards.countedCards['J'] === 1) 
        ) {
        return 2;
    } else if (Object.keys(handObject.cards.countedCards).filter(key => handObject.cards.countedCards[key] === 1).length === 5) {
        return 1;
    }
    return 0;
}

let hands = realInput.split(/\r?\n/).map(line => {
    const cardObject = {
        cards: {
            originalHand: line.split(' ')[0].split(''),
            countedCards: {
                '2': 0,
                '3': 0,
                '4': 0,
                '5': 0,
                '6': 0,
                '7': 0,
                '8': 0,
                '9': 0,
                'T': 0,
                'J': 0,
                'Q': 0,
                'K': 0,
                'A': 0
            }
        },
        bid: +line.split(' ')[1],
        strength: -1,
        score: -1
    }

    cardObject.cards.originalHand.forEach(card => cardObject.cards.countedCards[card]++);

    cardObject.strength = determineHandStrength(cardObject)

    return cardObject;
})

hands.sort((a, b) => {
    if (a.strength !== b.strength) {
        return a.strength - b.strength;
    }
    for (let i = 0; i < a.cards.originalHand.length; i++) {
        if (a.cards.originalHand[i] !== b.cards.originalHand[i]) {
            return cardRatings[a.cards.originalHand[i]] - cardRatings[b.cards.originalHand[i]]
        }
    }
    console.log('This is broken');
    return 0;
});

hands.forEach((hand, index) => {
    hand.score = (index+1) * hand.bid;
})

const finalScore = hands.reduce((acc, cur) => acc + cur.score, 0)

console.log(finalScore)




