// CARDS

const deck = [
]

for (let i = 0; i < 5; i++) {
  deck.push({
    type: 'att',
    att: 1
  })
}

for (let i = 0; i < 5; i++) {
  deck.push({
    type: 'att',
    att: 2
  })
}

for (let i = 0; i < 7; i++) {
  deck.push({
    type: 'def',
    def: 1
  })
}

for (let i = 0; i < 5; i++) {
  deck.push({
    type: 'def',
    def: 2
  })
}

for (let i = 0; i < 15; i++) {
  deck.push({
    type: 'sp',
    sp: 1
  })
}

for (let i = 0; i < 5; i++) {
  deck.push({
    type: 'sp',
    sp: 2
  })
}
