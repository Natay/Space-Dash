
// WHEN YOU CLICK ON A CARD
let thisCard
let index
let defendingCard
let defendingCardIndex

function playCard (card) {
  index = Array.from(card.parentNode.children).indexOf(card)
  thisCard = card
  if (card.dataset.type === 'att') {
    attack(card)
  } else if (card.dataset.type === 'def') {
    defense(card)
  } else if (card.dataset.type === 'sp') {
    shipPoint(card)
  }
}

function attack (card) {
  let opponent
  let thisPlayer

  if (whosTurn) {
    thisPlayer = player1
    opponent = player2
  } else {
    thisPlayer = player2
    opponent = player1
  }

  if (opponent.shipParts === 0) {
    instructionsText.textContent = ''
    typed('.instructions-text', ['You attacked, but your opponent doesn\'t have any points right now'], turnEnd)
  } else {
    if (whosTurn) {
      typed('.instructions-text', ['', 'first player is attacking Second player', 'Shall second player defend?', 'Press \'Y\' for Yes, or \'N\' for No'], defendingAttack)
    } else {
      typed('.instructions-text', ['', 'second player is attacking first player', 'Shall first player defend?', 'Press \'Y\' for Yes, or \'N\' for No'], defendingAttack)
    }
  }
}

function defense (card) {

  let opponent
  let thisPlayer

  if (whosTurn) {
    thisPlayer = player1
    opponent = player2
  } else {
    thisPlayer = player2
    opponent = player1
  }

  instructionsText.textContent = ''
  typed('.instructions-text', ['You can\'t play that if your opponent hasn\'t attacked yet'])
}

function shipPoint (card) {

  let opponent
  let thisPlayer

  if (whosTurn) {
    thisPlayer = player1
    opponent = player2
  } else {
    thisPlayer = player2
    opponent = player1
  }

  if (whosTurn) {
    player1.shipParts += 1 // should vary by point value eventually
    pOneStats.textContent = `ShipPoints: ${thisPlayer.shipParts}`
    console.log(card.parentNode)
    card.parentNode.removeChild(card)
  } else {
    player2.shipParts += 1 // should vary by point value eventually
    pTwoStats.textContent = `ShipPoints: ${player2.shipParts}`
    card.parentNode.removeChild(card)
  }
  instructionsText.textContent = ''
  typed('.instructions-text', ['you just added a ship part!'], checkWinner)
  graveyard.classList.remove('hidden')
}

function checkWinner () {
  if(player1.shipParts >= 3) {
    typed('.instructions-text', ['PLAYER 1 HAS WON THE GAME'], location.reload)
  } else if (player2.shipParts >= 3) {
    typed('.instructions-text', ['PLAYER 2 HAS WON THE GAME'], location.reload)
  } else {
    turnEnd()
  }
}


function defendingAttack () {
  document.body.addEventListener('keypress', function (e) {
    if (e.key === 'y') {
      typed('.instructions-text', ['Attacker, turn away from the screen'], hideCardsSoPlayerCanDefend)

      function hideCardsSoPlayerCanDefend () {
        const pOneCards = document.querySelectorAll('.player-one-cards img')
        const pTwoCards = document.querySelectorAll('.player-two-cards img')
        if (whosTurn) {
          for (let i = 0; i < pOneCards.length; i++) {
            pOneCards[i].setAttribute('src', 'lib/img/hidden.png')
          }

          // DISPLAY CARDS
          instructionsText.textContent = ''
          for (let i = 0; i < pTwoCards.length; i++) {
            pTwoCards[i].setAttribute('src', `lib/img/${player2.cards[i].type}.png`)
            pTwoCards[i].addEventListener('click', (e) => {
              if (e.target.className === 'card' && e.target.className !== 'deck' && e.target.getAttribute('src') !== 'lib/img/hidden.png') {
                e.stopPropagation()
                defendingCard = e.target
                defendingCardIndex = Array.from(e.target.parentNode.children).indexOf(e.target)
                checkIfDefenseCard()
              }
            }, false)
          }
        } else {
          for (let i = 0; i < pTwoCards.length; i++) {
            pTwoCards[i].setAttribute('src', 'lib/img/hidden.png')
          }
          // DISPLAY CARDS
          instructionsText.textContent = ''
          for (let i = 0; i < pOneCards.length; i++) {
            pOneCards[i].setAttribute('src', `lib/img/${player1.cards[i].type}.png`)
            pOneCards[i].addEventListener('click', (e) => {
              if (e.target.className === 'card' && e.target.className !== 'deck' && e.target.getAttribute('src') !== 'lib/img/hidden.png') {
                e.stopPropagation()
                defendingCard = e.target
                defendingCardIndex = Array.from(e.target.parentNode.children).indexOf(e.target)
                checkIfDefenseCard()
              }
            }, false)
          }
        }
      }

    } else if (e.key === 'n') {
      successfulAttack()
    }
  })
}

function checkIfDefenseCard () {
  if (defendingCard.dataset.type !== 'def') {

    typed('.instructions-text', ['That is not a defense card', 'Attack will proceed as planned'], successfulAttack)
  } else {
    typed('.instructions-text', ['You defended against your opponent!'], successfulDefense)
  }
}

function successfulAttack () {
  instructionsText.textContent = ''
      typed('.instructions-text', [`You attacked your opponent for ${thisCard.dataset.pt}`], turnEnd)
      if (whosTurn) {
        player2.shipParts -= 1
        pTwoStats.textContent = `ShipPoints: ${player2.shipParts}`
      } else {
        player1.shipParts -= 1
        pOneStats.textContent = `ShipPoints: ${player1.shipParts}`
      }
}


function successfulDefense () {
  // let pOneCards = document.querySelectorAll('.player-one-cards img')
  // let pTwoCards = document.querySelectorAll('.player-two-cards img')
  if (whosTurn) {
    // defendingCard.parentElement.removeChild(defendingCard)
    player2.cards.splice(defendingCardIndex)
    // for (let i = 0; i < pTwoCards.length; i++) {
    //   pTwoCards[i].setAttribute('src', 'lib/img/hidden.png')
    // }
    turnEnd()
  } else {
    // defendingCard.parentElement.removeChild(defendingCard)
    player1.cards.splice(defendingCardIndex)
    // for (let i = 0; i < pOneCards.length; i++) {
    //   pOneCards[i].setAttribute('src', 'lib/img/hidden.png')
    // }
    turnEnd()
  }
}

