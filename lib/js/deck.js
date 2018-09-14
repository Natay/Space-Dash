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
    pt: 1 // should be two eventually
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
    pt: 1 // should be two eventually
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
    pt: 1 // should be two eventually
  })
}
