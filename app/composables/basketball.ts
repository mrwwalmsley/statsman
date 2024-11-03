import { acceptHMRUpdate, defineStore } from 'pinia'

export const useBasketballStore = defineStore('basketball', () => {
  const players = ref([{
    name: 'Haami',
    number: '9',
  }, {
    name: 'Zach',
    number: '10',
  }, {
    name: 'Ruffy',
    number: '11',
  }, {
    name: 'Iharaira',
    number: '12',
  }, {
    name: 'Elnez',
    number: '13',
  }, {
    name: 'Isabel',
    number: '14',
  }, {
    name: 'Zion',
    number: '15',
  }, {
    name: 'Robin',
    number: '16',
  }].map(player => ({
    ...player,
    offensiveRebounds: 0,
    defensiveRebounds: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
    turnovers: 0,
    onePointFoul: 0,
    twoPointFoul: 0,
    fieldGoalsMade: 0,
    fieldGoalsAttempted: 0,
    threePointersMade: 0,
    threePointersAttempted: 0,
    freeThrowsMade: 0,
    freeThrowsAttempted: 0,
    onePointFoulsDrawn: 0,
    twoPointFoulsDrawn: 0,
  })))

  return {
    players,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
