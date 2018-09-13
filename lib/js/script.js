// DOM STUFF
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

// ENDING A TURN
function turnEnd() {
  setTimeout(() => {
    instructionsText.textContent = ''
    typed('.instructions-text', ['Your turn has ended'], def)
    const pOneCards = document.querySelectorAll('.player-one-cards img')
    const pTwoCards = document.querySelectorAll('.player-two-cards img')

    if (whosTurn) {
      for (let i = 0; i < pOneCards.length; i++) {
        pOneCards[i].setAttribute('src', `lib/img/hidden.png`)
      }
    } else {
      for (let i = 0; i < pOneCards.length; i++) {
        pTwoCards[i].setAttribute('src', `lib/img/hidden.png`)
      }
    }

    if (whosTurn) {
      instructionsText.textContent = ''
      whosTurn = false;
      typed('.instructions-text', ['Your turn has ended', 'Player 2\'s turn'], player2.makeMove)
    } else {
      whosTurn = true;
      instructionsText.textContent = ''
      typed('.instructions-text', ['Your turn has ended', 'Player 1\'s turn'], player1.makeMove)
    }
  }, 1000)
}

// PLAYERS

let player1 = {
  shipParts: 0,
  cards: [],
  makeMove() {
    // PREVENT DECK FROM BEING CLICKED AGAIN
    deckDiv.style.pointerEvents = 'none'
    // DRAW A NEW CARD
    let newCard = deck.shift()
    player1.cards.push(newCard)
    let card = document.createElement('img')
    card.classList.add('card')
    card.setAttribute('src', `lib/img/hidden.png`)
    card.setAttribute('data-type', `${player1.cards[player1.cards.length - 1].type}`)
    card.setAttribute('data-pt', `${player1.cards[player1.cards.length - 1].pt}`)
    playerOneCards.appendChild(card)

    // DISPLAY CARDS
    instructionsText.textContent = ''
    setTimeout(() => {
      const pOneCards = document.querySelectorAll('.player-one-cards img')
      for (let i = 0; i < this.cards.length; i++) {
        pOneCards[i].setAttribute('src', `lib/img/${this.cards[i].type}.png`)
      }
    }, 2000)

    instructionsText.textContent = ''
    typed('.instructions-text', ['Now, make a move'], def)

    overlay.addEventListener('click', (e) => {
      if (e.target.className === 'card' && e.target.className !== 'deck' && e.target.getAttribute('src') !== 'lib/img/hidden.png') {
        e.stopPropagation()
        playCard(e.target)
      }
    })
  }
}

let player2 = {
  shipParts: 0,
  cards: [],
  makeMove () {
    // PREVENT DECK FROM BEING CLICKED AGAIN
    deckDiv.style.pointerEvents = 'none'
    // DRAW A NEW CARD
    let newCard = deck.shift()
    player2.cards.push(newCard)
    let card = document.createElement('img')
    card.classList.add('card')
    card.setAttribute('src', `lib/img/hidden.png`)
    card.setAttribute('data-type', `${player2.cards[player2.cards.length - 1].type}`)
    card.setAttribute('data-pt', `${player2.cards[player2.cards.length - 1].pt}`)
    playerTwoCards.appendChild(card)

    // DISPLAY CARDS
    instructionsText.textContent = ''
    setTimeout(() => {
      const pTwoCards = document.querySelectorAll('.player-two-cards img')
      for (let i = 0; i < pTwoCards.length; i++) {
        pTwoCards[i].setAttribute('src', `lib/img/${player2.cards[i].type}.png`)
      }
    }, 2000)

    instructionsText.textContent = ''
    typed('.instructions-text', ['Now, make a move'], def)

    overlay.addEventListener('click', (e) => {
      if (e.target.className === 'card' && e.target.className !== 'deck' && e.target.getAttribute('src') !== 'lib/img/hidden.png') {
        e.stopPropagation()
        playCard(e.target)
      }
    })
  }
}

const shuffle = (deck) => {
  for (let aCard = deck.length - 1; aCard > 0; aCard--) {
    let randomCard = Math.floor(Math.random() * (aCard + 1))
      ;[deck[aCard], deck[randomCard]] = [deck[randomCard], deck[aCard]]
  }
  return deck
}

// THIS DISTRIBUTES 5 CARDS TO EACH PLAYER EVEN BEFORE DOM IS LOADED
const startGame = () => {
  shuffle(deck)
  for (let i = 0; i < 5; i++) {
    player1.cards.push(deck.shift())
  }
  for (let i = 0; i < 5; i++) {
    player2.cards.push(deck.shift())
  }
}

// THIS RUNS THE DISTRIBUTION
startGame()
