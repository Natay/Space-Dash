// PLAYERS

let player1 = {
  shipParts: 0,
  cards: []
}

let player2 = {
  shipParts: 0,
  cards: []
}

let player3 = {
  shipParts: 0,
  cards: []
}

let player4 = {
  shipParts: 0,
  cards: []
}

const startGame = () => {
  console.log('game started!')
  player1.name = prompt('Player 1: What is your name')
  let player1Ship = prompt('Choose a ship (1-4)')
  player2.name = prompt('Player 2: What is your name')
  let player2Ship = prompt('Choose a ship (1-4)')
}

startGame()
