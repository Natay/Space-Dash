// DOM STUFF
const pTwoCards = document.querySelector('.player-two-cards')
const instructionsText = document.querySelector('.instructions-text')
const deckDiv = document.querySelector('.deck-div')
const pOneStats = document.querySelector('.player-one-stats')
const pTwoStats = document.querySelector('.player-two-stats')

// TYPED.JS
let typed = (elem, arr, callback) => {
  let options = {
    typeSpeed: 10,
    strings: arr,
    showCursor: false,
    onComplete: callback,
    backDelay: 1000,
    fadeOut: true,
    fadeOutClass: 'typed-fade-out',
    fadeOutDelay: 1000,
  }

  let typed = new Typed(elem, options)
}

// EVERYTHING ELSE
let whosTurn = true

const playCard = (card) => {
  let thisPlayer
  let opponent
  if (whosTurn) {
    thisPlayer = player1
    opponent = player2
  } else {
    thisPlayer = player1
    opponent = player1
  }
  if (card.dataset.type === 'att') {
    if (opponent.shipParts === 0) {
      instructionsText.textContent = ''
      typed('.instructions-text', ['You attacked, but your opponent doesn\'t have any points right now'], def)
    } else {
      console.log(`You attacked your opponent for ${card.dataset.pt}`)
    }
  } else if (card.dataset.type === 'def') {
    instructionsText.textContent = ''
    typed('.instructions-text', ['You can\'t play that if your opponent hasn\'t attacked yet'], def)
  } else if (card.dataset.type === 'sp') {
    instructionsText.textContent = ''
    typed('.instructions-text', ['you just added a ship part!'], def)
    thisPlayer.shipParts += parseInt(card.dataset.pt)
    if (whosTurn) {
      pOneStats.textContent = `ShipPoints: ${player1.shipParts}`
    } else {
      pTwoStats.textContent = `ShipPoints: ${player2.shipParts}`
    }

  }
}

// PLAYERS

let player1 = {
  shipParts: 0,
  cards: [],
  makeMove () {
    // PREVENT DECK FROM BEING CLICKED AGAIN
    deckDiv.style.pointerEvents = 'none'
    // DRAW A NEW CARD
    let newCard = deck.shift()
    this.cards.push(newCard)
    let card = document.createElement('img')
    card.classList.add('card')
    card.setAttribute('src', `lib/img/hidden.png`)
    card.setAttribute('data-type', `${player1.cards[player1.cards.length - 1].type}`)
    card.setAttribute('data-pt', `${player1.cards[player1.cards.length - 1].pt}`)
    playerOneCards.appendChild(card)

    // DISPLAY CARDS
    instructionsText.textContent = ''
    typed('.instructions-text', ['Player 1 cards will now be displayed'], def)
    setTimeout(() => {
      const pOneCards = document.querySelectorAll('.player-one-cards img')
      for (let i = 0; i < this.cards.length; i++) {
        pOneCards[i].setAttribute('src', `lib/img/${this.cards[i].type}.png`)
      }
    }, 2000)

    instructionsText.textContent = ''
    typed('.instructions-text', ['Now, make a move','Here are your opponents stats', `Player 2: ${player2.shipParts} Ship Parts`], def)
    console.log('draw a card before ending your turn')
    this.cards.push(deck.shift())
    console.log('turn end')
    whosTurn = false
  }
}

let player2 = {
  shipParts: 0,
  cards: [],
  makeMove () {
    console.log('Player 2: Your Move')
    console.log('draw')
    this.cards.push(deck.shift())
    console.log('Here are your cards')
    for (let i = 0; i < this.cards.length; i++) {
      console.log(this.cards[i])
    }
    console.log('Here are your opponents stats')
    console.log(`Player 1: ${player1.shipParts} Ship Parts`)
    // let choice = prompt(`Choose a card to play from 1 to ${this.cards.length}`)
    // playCard(this.cards[choice - 1], player2, player1)

    console.log('draw a card before ending your turn')
    this.cards.push(deck.shift())
    console.log('turn end')
    whosTurn = true
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
  shuffle(deck)

  for (let i = 0; i < 5; i++) {
    player1.cards.push(deck.shift())
  }
  console.log('and 5 for you...');
  for (let i = 0; i < 5; i++) {
    player2.cards.push(deck.shift())
  }

  // while (player1.shipParts !== 9 && player2.shipParts !== 9 && deck.length !== 0) {
    
}

startGame()
