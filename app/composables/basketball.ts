import { acceptHMRUpdate, defineStore } from 'pinia'

function createInitialPlayers() {
  return [
    // { number: '1', name: 'Teia', sub: false },
    // { number: '2', name: 'Elyssa', sub: false },
    // { number: '3', name: 'Katie', sub: false },
    // { number: '4', name: 'Madeline', sub: false },
    // { number: '5', name: 'Raine', sub: false },
    // { number: '6', name: 'Braxton', sub: true },
    // { number: '7', name: 'Maya', sub: true },
    // { number: '8', name: 'Carter', sub: true },
    // { number: '9', name: 'Haami', sub: false },
    // { number: '10', name: 'Zach', sub: false },
    // { number: '11', name: 'Ruffy', sub: false },
    // { number: '12', name: 'Iharaira', sub: false },
    // { number: '13', name: 'Elnez', sub: false },
    // { number: '14', name: 'Isabel', sub: true },
    // { number: '15', name: 'Zion', sub: true },
    // { number: '16', name: 'Robin', sub: true },
    { number: '4', name: 'Fin', sub: false },
    { number: '5', name: 'Rakai', sub: false },
    { number: '6', name: 'Peyton', sub: false },
    { number: '7', name: 'Tamati', sub: true },
    { number: '8', name: 'Thomas', sub: true },
    { number: '10', name: 'Wolfe', sub: true },
    { number: '11', name: 'Ihakara', sub: false },
    { number: '15', name: 'Isaiah', sub: false },
  ].map(player => ({
    ...player,
    visible: true,
    stats: stats.reduce((acc, stat) => {
      acc[stat.abbreviation] = 0
      return acc
    }, {} as Record<string, number>),
  }))
}

export const useBasketballStore = defineStore('basketball', () => {
  const players = ref(createInitialPlayers())

  const actions = ref([] as Array<{ index: number, action: string, timestamp: Date }>)
  const isPeriodRunning = ref(false)

  function rebuildStats() {
    const newPlayers = createInitialPlayers()

    actions.value.forEach(({ index, action }) => {
      const player = newPlayers[index]!

      if (action === 'start') {
        isPeriodRunning.value = true
      }
      else if (action === 'end') {
        isPeriodRunning.value = false
      }
      else if (action === 'hide') {
        player.visible = false
      }
      else if (action === 'sub') {
        player.sub = !player.sub
      }
      else if (index >= 0) {
        player.stats[action]!++
        player.sub = false

        if (action === '2P' || action === '3P' || action === 'FT') {
          const attemptAction = `${action.charAt(0)}A`
          player.stats[attemptAction]!++
        }
      }
    })

    players.value = newPlayers
  }

  function remove(date: Date) {
    actions.value = actions.value.filter(action => action.timestamp !== date)
    rebuildStats()
  }

  function input(action: string, index = -1) {
    actions.value.push({ index, action, timestamp: new Date() })
    rebuildStats()
  }

  function undo() {
    actions.value.pop()
    rebuildStats()
  }

  function getActionTime(index: number) {
    const startTime = actions.value.slice(0, index + 1)
      .findLast(({ action }) => action === 'start', index)
      ?.timestamp
    const actionTime = actions.value[index]?.timestamp
    return getElapsedTime(startTime, actionTime)
  }

  const teamScore = computed(() => actions.value.reduce((acc, action) => {
    if (action.index >= 0) {
      if (action.action === '2P')
        return acc + 2
      if (action.action === '3P')
        return acc + 3
      if (action.action === 'FT')
        return acc + 1
    }
    return acc
  }, 0))

  const opponentScore = computed(() => actions.value.reduce((acc, action) => {
    if (action.index < 0) {
      if (action.action === '2P')
        return acc + 2
      if (action.action === '3P')
        return acc + 3
      if (action.action === 'FT')
        return acc + 1
    }
    return acc
  }, 0))

  return {
    teamScore,
    opponentScore,
    getActionTime,
    actions,
    players,
    stats,
    left,
    right,
    input,
    undo,
    remove,
    isPeriodRunning,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBasketballStore, import.meta.hot))
}
