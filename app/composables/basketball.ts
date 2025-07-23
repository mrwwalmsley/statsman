import { acceptHMRUpdate, defineStore } from 'pinia'

const teams = [
  {
    id: 'celtics',
    name: 'Celtics',
    players: [
      { number: '4', name: 'Haami' },
      { number: '6', name: 'Tairawhiti' },
      { number: '8', name: 'Robin' },
      { number: '9', name: 'Zach' },
      { number: '10', name: 'Elnez' },
      { number: '11', name: 'Iharaira' },
      { number: '12', name: 'Walker' },
      { number: '13', name: 'Ruffy' },
    ],
  },
  {
    id: 'phillies',
    name: 'Phillies',
    players: [
      { number: '4', name: 'Fin' },
      { number: '5', name: 'Rakai' },
      { number: '6', name: 'Peyton' },
      { number: '7', name: 'Tamati' },
      { number: '8', name: 'Thomas' },
      { number: '10', name: 'Wolfe' },
      { number: '11', name: 'Ihakara' },
      { number: '15', name: 'Isaiah' },
    ],
  },
]

function createInitialPlayers(teamId: typeof teams[number]['id']) {
  return teams.find(team => team.id === teamId)!.players.map(player => ({
    ...player,
    sub: false,
    visible: true,
    stats: stats.reduce((acc, stat) => {
      acc[stat.abbreviation] = 0
      return acc
    }, {} as Record<string, number>),
  }))
}

export const useBasketballStore = defineStore('basketball', () => {
  const route = useRoute('basketball-team')
  const players = ref(createInitialPlayers(route.params.team))

  const actions = ref([] as Array<{ index: number, action: string, timestamp: Date }>)
  const isPeriodRunning = ref(false)

  function rebuildStats() {
    const newPlayers = createInitialPlayers(route.params.team)

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
    teamId: route.params.team,
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
