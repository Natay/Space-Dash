let whosTurn = true

const playCard = (card, player) => {
  if (card.type === 'att') {
    console.log('you attacked your opponent for 1 point')
  } else if (card.type === 'def') {
    console.log('you defended against your opponent')
  } else if (card.type === 'sp') {
    console.log('you just added a ship part!')
    player.shipParts += card.sp
  }
}

// PLAYERS

let player1 = {
  shipParts: 0,
  cards: [],
  makeMove () {
    let playerOne = this
    console.log('Player 1: Your Move')
    console.log('draw')
    this.cards.push(deck.shift())
    console.log('Here are your cards')
    for (let i = 0; i < this.cards.length; i++) {
      console.log(this.cards[i])
    }
    let choice = prompt(`Choose a card to play from 1 to ${this.cards.length}`)
    playCard(this.cards[choice - 1], playerOne)
  }
}

let player2 = {
  shipParts: 0,
  cards: [],
  makeMove () {
    console.log('I\'m thinking!')
  }
}

const shuffle = (deck) => {
  for (let aCard = deck.length - 1; aCard > 0; aCard--) {
    let randomCard = Math.floor(Math.random() * (aCard + 1))
    ;[deck[aCard], deck[randomCard]] = [deck[randomCard], deck[aCard]]
  }
  return deck
}

const startGame = () => {
  console.log('game started!')

  // PICKING NAMES AND SHIPS
  player1.name = prompt('Player 1: What is your name')
  let player1Ship = parseInt(prompt('Player 1: Choose a ship (1-4)'))
  player1.ship = ships[player1Ship - 1]
  player2.name = prompt('Player 2: What is your name')
  let player2Ship = parseInt(prompt('Player 2: Choose a ship (1-4)'))
  player2.ship = ships[player1Ship - 1]

  // SHUFFLING DECK
  console.log('shuffling deck')
  shuffle(deck)

  // DISTRIBUTING CARDS
  console.log('distributing cards')
  console.log('5 for you...')
  for (let i = 0; i < 5; i++) {
    player1.cards.push(deck.shift())
  }
  console.log('and 5 for you...');
  for (let i = 0; i < 5; i++) {
    player2.cards.push(deck.shift())
  }

  // BEGIN GAME
  console.log('great! Now let\'s begin')
  console.log('player 1, make your move')
  
  // while (player1.shipParts !== 9 && player2.shipParts !== 9 && deck.length !== 0) {
    if (whosTurn) {
      player1.makeMove()
    } else {
      player2.makeMove()
    }
  // }
}

startGame()
