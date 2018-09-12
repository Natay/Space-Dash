const newGameBtn = document.querySelector('#new-game')
const splashScreen = document.querySelector('#splash-screen')
const gameScreen = document.querySelector('#game-screen')
const gameText = document.querySelector('.game-text')
const shipsDiv = document.querySelector('.display-cards')
const chooseShipText = document.querySelector('.choose-ship')
const overlay = document.querySelector('.overlay')

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

const displayShips = () => {
  for (let i = 1; i < ships.length + 1; i++) {
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
      overlay.appendChild(e.target)
    }
  })
}

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