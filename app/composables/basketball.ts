import { acceptHMRUpdate, defineStore } from 'pinia'

export const stats = [
  { abbreviation: 'OR', color: 'orange' },
  { abbreviation: 'DR', color: 'orange' },
  { abbreviation: 'A', color: 'yellow' },
  { abbreviation: '2P', color: 'blue' },
  { abbreviation: '2A', color: 'blue' },
  { abbreviation: '3P', color: 'lightblue' },
  { abbreviation: '3A', color: 'lightblue' },
  { abbreviation: 'FT', color: 'blue' },
  { abbreviation: 'FA', color: 'blue' },
  { abbreviation: 'ST', color: 'red' },
  { abbreviation: 'BS', color: 'red' },
  { abbreviation: 'TO', color: 'black' },
  { abbreviation: 'PF', color: 'black' },
  // 'onePointFoul',
  // 'twoPointFoul',
  // 'onePointFoulsDrawn',
  // 'twoPointFoulsDrawn',
]

const initialValues = stats.reduce((acc, stat) => {
  acc[stat.abbreviation] = 0
  return acc
}, {} as Record<string, number>)

function createInitialPlayers() {
  return [
    { number: '1', name: 'Teia', sub: false },
    { number: '2', name: 'Elyssa', sub: false },
    { number: '3', name: 'Katie', sub: false },
    { number: '4', name: 'Madeline', sub: false },
    { number: '5', name: 'Raine', sub: false },
    { number: '6', name: 'Braxton', sub: true },
    { number: '7', name: 'Maya', sub: true },
    { number: '8', name: 'Carter', sub: true },
    // { number: '9', name: 'Haami', sub: false },
    // { number: '10', name: 'Zach', sub: false },
    // { number: '11', name: 'Ruffy', sub: false },
    // { number: '12', name: 'Iharaira', sub: false },
    // { number: '13', name: 'Elnez', sub: false },
    // { number: '14', name: 'Isabel', sub: true },
    // { number: '15', name: 'Zion', sub: true },
    // { number: '16', name: 'Robin', sub: true },
  ].map(player => ({
    ...player,
    stats: { ...initialValues },
  }))
}

export const useBasketballStore = defineStore('basketball', () => {
  const players = ref(createInitialPlayers())

  const actions = ref([] as Array<{ index: number, action: string }>)

  function rebuildStats() {
    const newPlayers = createInitialPlayers()

    actions.value.forEach(({ index, action }) => {
      const player = newPlayers[index]!

      if (action === 'sub') {
        player.sub = !player.sub
      }
      else {
        player.stats[action]!++
        player.sub = false
      }
    })

    players.value = newPlayers
  }

  function input(index: number, action: string) {
    actions.value.push({ index, action })
    rebuildStats()
  }

  function undo() {
    actions.value.pop()
    rebuildStats()
  }

  return {
    actions,
    players,
    stats,
    input,
    undo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
