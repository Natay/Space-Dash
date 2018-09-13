const newGameBtn = document.querySelector('#new-game')
const splashScreen = document.querySelector('#splash-screen')
const gameScreen = document.querySelector('#game-screen')
const storyText = document.querySelector('#typed')
const shipsDiv = document.querySelector('.display-cards')
const chooseShipText = document.querySelector('.choose-ship')
const overlay = document.querySelector('.overlay')
const playerOneCards = document.querySelector('.player-one-cards')
const playerTwoCards = document.querySelector('.player-two-cards')
const playerOneBoard = document.querySelector('.player-one-board')
const playerTwoBoard = document.querySelector('.player-two-board')
const spaceshipOverlayOne = document.querySelector('.spaceship-overlay-one')
const spaceshipOverlayTwo = document.querySelector('.spaceship-overlay-two')
const board = document.querySelector('.board')

// ==========================
// SHOW THE GAME INTRODUCTION
// ==========================
const gameStory = () => {
  typed('#typed', ['Welcome Space Cadet!'], displayShips)

  // , 'The Year is 1960', 'And the space race is on.', 'Countries all over the world are working nonstop to', 'be the first country to get a human in space.', 'Will You be the first?', 'Or will your enemies crush you?'
}

// A DEFAULT FUNCTION THAT DOESN'T DO ANYTHING TO PASS INTO TYPED
function def () {
  setTimeout(() => {
    console.log('time over!')
  }, 3000)
}

// ==========================
// DISPLAY THE SHIPS TO PICK
// ==========================
const displayShips = () => {
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
// MAKE A MOVE
// =============================

let playTurn = () => {
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
// DISPLAY THE DECK AND THE CARDS
// =============================
const displayBoard = () => {
  let deck = document.createElement('img')
  deck.classList.add('deck')
  deck.setAttribute('src', `lib/img/deck.png`)
  deckDiv.appendChild(deck)

  for (let i = 0; i < 5; i++) {
    let card = document.createElement('img')
    card.classList.add('card')
    card.setAttribute('src', `lib/img/hidden.png`)
    card.setAttribute('data-type', `${player1.cards[i].type}`)
    card.setAttribute('data-pt', `${player1.cards[i].pt}`)
    playerOneCards.appendChild(card)
  }

  for (let i = 0; i < 5; i++) {
    let card = document.createElement('img')
    card.classList.add('card')
    card.setAttribute('src', `lib/img/hidden.png`)
    card.setAttribute('data-type', `${player2.cards[i].type}`)
    playerTwoCards.appendChild(card)
  }
  playTurn()
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

newGameBtn.addEventListener('click', () => {
  gameScreen.classList.remove('hidden')
  splashScreen.style.opacity = '0'
  gameScreen.style.opacity = '1'
  splashScreen.classList.add('ghost')
  gameScreen.classList.remove('ghost')

  splashScreen.classList.add('hidden')
  gameStory()
})

// PLAYING CARDS ON CLICKING ON THEM

overlay.addEventListener('click', (e) => {
  if (e.target.className === 'card' && e.target.className !== 'deck' && e.target.getAttribute('src') !== 'lib/img/hidden.png') {
    playCard(e.target)
  }
})