// CARDS

const deck = [
]

for (let i = 0; i < 5; i++) {
  deck.push({
    type: 'att',
    pt: 1
  })
}

for (let i = 0; i < 5; i++) {
  deck.push({
    type: 'att',
    pt: 2
  })
}

for (let i = 0; i < 7; i++) {
  deck.push({
    type: 'def',
    pt: 1
  })
}

for (let i = 0; i < 5; i++) {
  deck.push({
    type: 'def',
    pt: 2
  })
}

for (let i = 0; i < 15; i++) {
  deck.push({
    type: 'sp',
    pt: 1
  })
}

for (let i = 0; i < 5; i++) {
  deck.push({
    type: 'sp',
    sp: 2
  })
}
