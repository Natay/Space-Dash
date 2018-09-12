// CARDS

const deck = [
  {
    type: 'att',
    att: 2,
    playCard () {
      console.log('this is an attack card')
    }
  },
  {
    type: 'sp',
    sp: 1,
    playCard () {
      console.log('this is an ship point card')
    }
  },

  {
    type: 'def',
    def: 2,
    playCard () {
      console.log('this is an attack card')
    }
  }
]
