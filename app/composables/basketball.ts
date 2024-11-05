import { acceptHMRUpdate, defineStore } from 'pinia'

export const stats = [
  { abbreviation: '2P', color: 'blue' },
  { abbreviation: '2A', color: 'blue' },
  { abbreviation: '3P', color: 'lightblue' },
  { abbreviation: '3A', color: 'lightblue' },
  { abbreviation: 'FT', color: 'blue' },
  { abbreviation: 'FA', color: 'blue' },
  { abbreviation: 'OR', color: 'orange' },
  { abbreviation: 'DR', color: 'orange' },
  { abbreviation: 'A', color: 'yellow' },
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
    { number: '9', name: 'Haami', sub: false },
    { number: '10', name: 'Zach', sub: false },
    { number: '11', name: 'Ruffy', sub: false },
    { number: '12', name: 'Iharaira', sub: false },
    { number: '13', name: 'Elnez', sub: false },
    { number: '14', name: 'Isabel', sub: true },
    { number: '15', name: 'Zion', sub: true },
    { number: '16', name: 'Robin', sub: true },
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
      }
    })

    players.value = newPlayers
  }

  function input(index: number, action: string) {
    // Check if the player is subbed
    if (action !== 'sub' && players.value[index]!.sub) {
      actions.value.push({ index, action: 'sub' })
    }

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
