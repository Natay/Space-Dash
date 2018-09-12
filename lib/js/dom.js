const newGameBtn = document.querySelector('#new-game')
const splashScreen = document.querySelector('#splash-screen')
const gameScreen = document.querySelector('#game-screen')
const gameText = document.querySelector('.game-text')
const shipsDiv = document.querySelector('.display-cards')
const chooseShipText = document.querySelector('.choose-ship')
const overlay = document.querySelector('.overlay')
const playerOneCards = document.querySelector('.player-one-cards')
const playerTwoCards = document.querySelector('.player-two-cards')
const spaceshipOverlayOne = document.querySelector('.spaceship-overlay-one')
const spaceshipOverlayTwo = document.querySelector('.spaceship-overlay-two')
const board = document.querySelector('.board')
const deckDiv = document.querySelector('.deck-div')

// ==========================
// SHOW THE GAME INTRODUCTION
// ==========================
const gameStory = () => {
  let counter = 0
  const story = ['Welcome Space Cadet!']

  // ['Welcome Space Cadet!', 'The Year is 1960', 'And the space race is on.', 'Countries all over the world are working nonstop to', 'be the first country to get a human in space.', 'Will You be the first?', 'Or will your enemies crush you?']

  const changeText = () => {
    gameText.innerHTML = story[counter]
    counter++
    if (counter >= story.length) {
      counter = 0
      clearInterval(iteration)
      displayShips()
      gameText.classList.add('hidden')
      chooseShipText.classList.remove('hidden')
    }
  }
  const iteration = setInterval(changeText, 3000)
}

// ==========================
// DISPLAY THE SHIPS TO PICK
// ==========================
const displayShips = () => {
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
        e.target.classList.remove('spaceship')
        e.target.classList.add('spaceship-avatar')
        overlay.appendChild(e.target)
        spaceshipOverlayOne.classList.remove('hidden')

        window.setTimeout(() => {
          shipsDiv.classList.remove('hidden')
          chooseShipText.textContent = 'Player 2: Choose Your Spaceship'
          chooseShipText.classList.remove('hidden')
        }, 1000)
      } else {
        e.target.classList.remove('spaceship')
        e.target.classList.add('spaceship-avatar-2')
        overlay.appendChild(e.target)
        spaceshipOverlayTwo.classList.remove('hidden')
        displayBoard()
      }
    }
  })
}

// =============================
// MAKE A MOVE
// =============================

let playTurn = () => {
  console.log('a turn is played')
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
    card.setAttribute('src', `lib/img/${player1.cards[i].type}.png`)
    playerOneCards.appendChild(card)
  }

  for (let i = 0; i < 5; i++) {
    let card = document.createElement('img')
    card.classList.add('card')
    card.setAttribute('src', `lib/img/${player2.cards[i].type}.png`)
    playerTwoCards.appendChild(card)
  }
  // playTurn()
}

board.addEventListener('click', (e) => {
  if (e.target.className === 'deck') {
    console.log('you clicked on the deck')
  }
})

newGameBtn.addEventListener('click', () => {
  gameScreen.classList.remove('hidden')
  splashScreen.style.opacity = '0'
  gameScreen.style.opacity = '1'
  splashScreen.classList.add('ghost')
  gameScreen.classList.remove('ghost')

  window.setTimeout(() => {
    splashScreen.classList.add('hidden')
  }, 1000)

  gameStory()
})