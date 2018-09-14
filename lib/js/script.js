// DOM STUFF
const instructionsText = document.querySelector('.instructions-text')
const deckDiv = document.querySelector('.deck-div')
const pOneStats = document.querySelector('.player-one-stats')
const pTwoStats = document.querySelector('.player-two-stats')
const newGameBtn = document.querySelector('#new-game')
const splashScreen = document.querySelector('#splash-screen')
const gameScreen = document.querySelector('#game-screen')
const storyText = document.querySelector('#typed')
const shipsDiv = document.querySelector('.display-cards')
const chooseShipText = document.querySelector('.choose-ship')
const overlay = document.querySelector('.overlay')
// const playerOneCards = document.querySelector('.player-one-cards')
// const playerTwoCards = document.querySelector('.player-two-cards')
const playerOneBoard = document.querySelector('.player-one-board')
const playerTwoBoard = document.querySelector('.player-two-board')
const spaceshipOverlayOne = document.querySelector('.spaceship-overlay-one')
const spaceshipOverlayTwo = document.querySelector('.spaceship-overlay-two')
const board = document.querySelector('.board')
const graveyard = document.querySelector('.graveyard')
// SETTING WHOS TURN IS IT, TRUE IS FIRST PLAYER
let whosTurn = true
let winner = 3

// =============================
// TYPED.JS
// =============================
let typed = (elem, arr, callback) => {
  let options = {
    typeSpeed: 10,
    strings: arr,
    showCursor: false,
    onComplete: callback,
    backDelay: 1000,
    fadeOut: true,
    fadeOutClass: 'typed-fade-out',
    fadeOutDelay: 1500
  }

  let typed = new Typed(elem, options)
}

// A DEFAULT FUNCTION THAT DOESN'T DO ANYTHING TO PASS INTO TYPED
function def () {
  setTimeout(() => {
  }, 3000)
}

// =============================
// THE PLAYERS
// =============================
let player1 = {
  name: 'Player 1',
  shipParts: 0,
  cards: [],
  makeMove () {
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
    const playerOneCardsContainer = document.querySelector('.player-one-cards')
    playerOneCardsContainer.appendChild(card)

    // DISPLAY CARDS
    instructionsText.textContent = ''
    let pOneCards = document.querySelectorAll('.player-one-cards img')
    for (let i = 0; i < pOneCards.length; i++) {
      pOneCards[i].setAttribute('src', `lib/img/${player1.cards[i].type}.png`)
    }

    instructionsText.textContent = ''
    typed('.instructions-text', ['Now, make a move'], def)

    // playing a card function

    for (let i = 0; i < pOneCards.length; i++) {
      pOneCards[i].addEventListener('click', (e) => {
        if (whosTurn && e.target.className === 'card' && e.target.className !== 'deck' && e.target.getAttribute('src') !== 'lib/img/hidden.png') {
          e.stopPropagation()
          let index = Array.from(e.target.parentNode.children).indexOf(e.target)
          player1.cards.splice(index, 1)
          playCard(e.target)
        }
      }, false)
    }
  }
}

let player2 = {
  name: 'Player 2',
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
    const playerTwoCardsContainer = document.querySelector('.player-two-cards')
    playerTwoCardsContainer.appendChild(card)

    // DISPLAY CARDS
    instructionsText.textContent = ''
    let pTwoCards = document.querySelectorAll('.player-two-cards img')
    for (let i = 0; i < pTwoCards.length; i++) {
      pTwoCards[i].setAttribute('src', `lib/img/${player2.cards[i].type}.png`)
    }

    instructionsText.textContent = ''
    typed('.instructions-text', ['Now, make a move'], def)

    // playing a card function

    for (let i = 0; i < pTwoCards.length; i++) {
      pTwoCards[i].addEventListener('click', (e) => {
        if (!whosTurn && e.target.className === 'card' && e.target.className !== 'deck' && e.target.getAttribute('src') !== 'lib/img/hidden.png') {
          e.stopPropagation()
          let index = Array.from(e.target.parentNode.children).indexOf(e.target)
          player2.cards.splice(index, 1)
          playCard(e.target)
        }
      }, false)
    }
  }
}

// =============================
// CHANGING FROM SPLASH SCREEN TO GAME SCREEN
// =============================
newGameBtn.addEventListener('click', (e) => {
  e.preventDefault()
  gameScreen.classList.remove('hidden')
  splashScreen.style.opacity = '0'
  gameScreen.style.opacity = '1'
  splashScreen.classList.add('ghost')
  gameScreen.classList.remove('ghost')

  splashScreen.classList.add('hidden')
  gameStory()
})

// =============================
// SHUFFLING AND DISTRIBUTING CARDS
// =============================
function startGame () {
  shuffle(deck)
  for (let i = 0; i < 5; i++) {
    player1.cards.push(deck.shift())
  }
  for (let i = 0; i < 5; i++) {
    player2.cards.push(deck.shift())
  }
}

// USING FISHER-YATES MODEL FOR SHUFFLING
function shuffle (deck) {
  for (let aCard = deck.length - 1; aCard > 0; aCard--) {
    let randomCard = Math.floor(Math.random() * (aCard + 1))
      ;[deck[aCard], deck[randomCard]] = [deck[randomCard], deck[aCard]]
  }
  return deck
}

// THIS RUNS THE DISTRIBUTION
startGame()

// ==========================
// SHOW THE GAME INTRODUCTION
// ==========================
function gameStory () {
  typed('#typed', ['Welcome Space Cadet!', 'The Year is 1960', 'And the space race is on.', 'Countries all over the world are working nonstop to', 'be the first country to get a human in space.', 'Will You be the first?', 'Or will your enemies crush you?'], displayShips)
}

// ==========================
// DISPLAY THE SHIPS TO PICK
// ==========================
function displayShips () {
  setTimeout(() => {
    storyText.classList.add('hidden')
    chooseShipText.classList.remove('hidden')
    typed('.choose-ship', ['Player 1: Choose Your Spaceship'], def)
    for (let i = 1; i < 4 + 1; i++) {
      let spaceship = document.createElement('img')
      spaceship.classList.add('spaceship')
      spaceship.setAttribute('src', `lib/img/spaceship${i}.png`)
      spaceship.setAttribute('data-ship', `${i}`)
      spaceship.setAttribute('alt', `spaceship number ${i}`)
      shipsDiv.appendChild(spaceship)
    }

    shipsDiv.addEventListener('click', (e) => {
      if (e.target.className === 'spaceship') {
        shipsDiv.classList.add('hidden')
        chooseShipText.classList.add('hidden')
        if (e.target.parentElement.children.length === 4) {
          // ADD PLAYER 1 SPACESHIP TO THE CORNER
          e.target.classList.remove('spaceship')
          e.target.classList.add('spaceship-avatar')
          playerOneBoard.appendChild(e.target)
          spaceshipOverlayOne.classList.remove('hidden')

          // ADD PLAYER 1 STATS ON SCREEN
          pOneStats.classList.remove('hidden')
          pOneStats.textContent = `ShipPoints: ${player1.shipParts}`

          chooseShipText.textContent = ''
          chooseShipText.classList.remove('hidden')
          typed('.choose-ship', ['Player 2: Choose Your Spaceship'], def)
          shipsDiv.classList.remove('hidden')
        } else {
          // ADD PLAYER 2 SPACESHIP TO THE CORNER
          e.target.classList.remove('spaceship')
          e.target.classList.add('spaceship-avatar-2')
          playerTwoBoard.appendChild(e.target)
          spaceshipOverlayTwo.classList.remove('hidden')

          // ADD PLAYER 2 STATS ON SCREEN
          pTwoStats.classList.remove('hidden')
          pTwoStats.textContent = `ShipPoints: ${player2.shipParts}`

          displayBoard()
        }
      }
    })
  }, 2000)
}

// =============================
// DISPLAY THE DECK AND THE CARDS
// =============================
function displayBoard () {
  let deck = document.createElement('img')
  deck.classList.add('deck')
  deck.setAttribute('src', `lib/img/deck.png`)
  deckDiv.appendChild(deck)

  const playerOneCards = document.querySelector('.player-one-cards')
  for (let i = 0; i < player1.cards.length; i++) {
    let card = document.createElement('img')
    card.classList.add('card')
    card.setAttribute('src', `lib/img/hidden.png`)
    card.setAttribute('data-type', `${player1.cards[i].type}`)
    card.setAttribute('data-pt', `${player1.cards[i].pt}`)
    playerOneCards.appendChild(card)
  }

  const playerTwoCards = document.querySelector('.player-two-cards')
  for (let i = 0; i < player2.cards.length; i++) {
    let card = document.createElement('img')
    card.classList.add('card')
    card.setAttribute('src', `lib/img/hidden.png`)
    card.setAttribute('data-type', `${player2.cards[i].type}`)
    card.setAttribute('data-pt', `${player2.cards[i].pt}`)
    playerTwoCards.appendChild(card)
  }
  playTurn()
}

// =============================
// MAKE A MOVE
// =============================

function playTurn () {
  let yourMove
  if (whosTurn === true) {
    yourMove = 'Player 1'
  } else {
    yourMove = 'Player 2'
  }
  instructionsText.textContent = ''
  typed('.instructions-text', [`${yourMove}: Your Move`, 'Make Sure that your opponent is not looking', 'Draw a Card'], youCanTouchDeck)
}

function youCanTouchDeck () {
  deckDiv.style.pointerEvents = 'auto'
}

// =============================
// LETTING YOU DRAW IF ITS YOUR TURN
// =============================
deckDiv.addEventListener('click', (e) => {
  if (e.target.className === 'deck') {
    if (whosTurn) {
      player1.makeMove()
    } else {
      player2.makeMove()
    }
  }
})

// =============================
// ENDING A TURN
// =============================
function turnEnd () {
  setTimeout(() => {
    instructionsText.textContent = ''
    const playerOneCardsContainer = document.querySelector('.player-one-cards')
    const playerTwoCardsContainer = document.querySelector('.player-two-cards')
    const pOneCards = document.querySelectorAll('.player-one-cards img')
    const pTwoCards = document.querySelectorAll('.player-two-cards img')

      for (let i = 0; i < pOneCards.length; i++) {
        pOneCards[i].parentElement.removeChild(pOneCards[i])
      }

      for (let i = 0; i < player1.cards.length; i++) {
        let card = document.createElement('img')
        card.setAttribute('src', 'lib/img/hidden.png')
        card.classList.add('card')
        playerOneCardsContainer.appendChild(card)
        card.setAttribute('data-type', `${player1.cards[i].type}`)
        card.setAttribute('data-pt', `${player1.cards[i].pt}`)
      }
      for (let i = 0; i < pTwoCards.length; i++) {
        pTwoCards[i].parentElement.removeChild(pTwoCards[i])
      }

      for (let i = 0; i < player2.cards.length; i++) {
        let card = document.createElement('img')
        card.setAttribute('src', 'lib/img/hidden.png')
        card.classList.add('card')
        playerTwoCardsContainer.appendChild(card)
        card.setAttribute('data-type', `${player2.cards[i].type}`)
        card.setAttribute('data-pt', `${player2.cards[i].pt}`)
      }

    if (whosTurn) {
      instructionsText.textContent = ''
      whosTurn = false
      typed('.instructions-text', ['Your turn has ended'], playTurn)
    } else {
      whosTurn = true
      instructionsText.textContent = ''
      typed('.instructions-text', ['Your turn has ended'], playTurn)
    }
  }, 1000)
}
