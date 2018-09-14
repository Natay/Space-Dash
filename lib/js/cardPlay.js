
// WHEN YOU CLICK ON A CARD
function playCard (card) {

  if (card.dataset.type === 'att') {
    attack(card)
  } else if (card.dataset.type === 'def') {
    defense(card)
  } else if (card.dataset.type === 'sp') {
    shipPoint(card)
  }
}

function attack (card) {

  if (whosTurn) {
    let thisPlayer = player1
    let opponent = player2
  } else {
    let thisPlayer = player1
    let opponent = player1
  }

  if (opponent.shipParts === 0) {
    instructionsText.textContent = ''
    typed('.instructions-text', ['You attacked, but your opponent doesn\'t have any points right now'], playCard)
  } else {
    instructionsText.textContent = ''
    typed('.instructions-text', [`You attacked your opponent for ${card.dataset.pt}`], turnEnd)
    opponent.shipParts -= 1
  }
}

function defense (card) {

  let thisPlayer
  let opponent

  if (whosTurn) {
    thisPlayer = player1
    opponent = player2
  } else {
    thisPlayer = player1
    opponent = player1
  }

  instructionsText.textContent = ''
  typed('.instructions-text', ['You can\'t play that if your opponent hasn\'t attacked yet'])
}

function shipPoint (card) {

  let thisPlayer
  let opponent

  if (whosTurn) {
    thisPlayer = player1
    opponent = player2
  } else {
    thisPlayer = player1
    opponent = player1
  }

  if (whosTurn) {
    player1.shipParts += 1 // should vary by point value eventually
    pOneStats.textContent = `ShipPoints: ${thisPlayer.shipParts}`
    card.parentNode.removeChild(card)
  } else {
    player2.shipParts += 1 // should vary by point value eventually
    pTwoStats.textContent = `ShipPoints: ${player2.shipParts}`
    card.parentNode.removeChild(card)
  }
  instructionsText.textContent = ''
  typed('.instructions-text', ['you just added a ship part!'], turnEnd)
  graveyard.classList.remove('hidden')
}
