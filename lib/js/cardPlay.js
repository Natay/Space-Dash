
// WHEN YOU CLICK ON A CARD
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
    attack(thisPlayer, opponent, card)
  } else if (card.dataset.type === 'def') {
    defense(thisPlayer, opponent, card)
  } else if (card.dataset.type === 'sp') {
    shipPoint(thisPlayer, opponent, card)
  }
}


let attack = (thisPlayer, opponent, card) => {
  if (opponent.shipParts === 0) {
    instructionsText.textContent = ''
    typed('.instructions-text', ['You attacked, but your opponent doesn\'t have any points right now'], playCard)
  } else {
    instructionsText.textContent = ''
    typed('.instructions-text', [`You attacked your opponent for ${card.dataset.pt}`], turnEnd)
  }
}

let defense = (thisPlayer, opponent, card) => {
  instructionsText.textContent = ''
  typed('.instructions-text', ['You can\'t play that if your opponent hasn\'t attacked yet'])
}

let shipPoint = (thisPlayer, opponent, card) => {
  instructionsText.textContent = ''
  thisPlayer.shipParts += parseInt(card.dataset.pt)
  if (whosTurn) {
    pOneStats.textContent = `ShipPoints: ${player1.shipParts}`
  } else {
    pTwoStats.textContent = `ShipPoints: ${player2.shipParts}`
  }
  typed('.instructions-text', ['you just added a ship part!'], turnEnd)
}
