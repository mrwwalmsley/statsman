<script setup lang="ts">
const score = useBasketballStore()
const currentTime = ref(new Date())

let timer: NodeJS.Timeout | null = null

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer)
    clearInterval(timer)
})

const time = computed(() => {
  if (currentTime.value) {
    // Trigger reactivity
  }

  const startIndex = score.actions
    .findLastIndex(action => action.action === 'start')

  const startTime = score.actions[startIndex]?.timestamp
  const endTime = score.actions.slice(startIndex)
    .find(action => action.action === 'end', startIndex)
    ?.timestamp
  return getElapsedTime(startTime, endTime)
})
</script>

<template>
  <div>
    <div flex justify-center gap-2 p-1 text-sm>
      <div text-lg font-mono>
        {{ time }}
      </div>
      <button
        w-20 btn
        @click="score.input(score.isPeriodRunning ? 'end' : 'start')"
      >
        {{ score.isPeriodRunning ? 'End' : 'Start' }}
      </button>
      <button
        w-20 btn
        :opacity=" score.actions.length === 0 ? '30' : '100'"
        @click="score.undo"
      >
        Undo
      </button>
      <NuxtLink
        w-20 btn
        :opacity=" score.actions.length === 0 ? '30' : '100'"
        to="/basketball/history"
      >
        History
      </NuxtLink>
    </div>
    <table mx-auto cursor-pointer text-5>
      <thead>
        <tr text-sm opacity-60>
          <th v-for="stat in score.left" :key="stat.abbreviation">
            {{ stat.abbreviation }}
          </th>
          <th>
            #
          </th>
          <th text-left>
            Name
          </th>
          <th v-for="stat in score.right" :key="stat.abbreviation">
            {{ stat.abbreviation }}
          </th>
          <th>x</th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="(player, index) in score.players"
          :key="player.number"
        >
          <tr
            v-if="player.visible"
            :class="player.sub ? 'opacity-30' : ''"
          >
            <td
              v-for="stat in score.left"
              :key="stat.abbreviation"
              :class="`bg-${stat.color}-600`"
              @click=" score.input(stat.abbreviation, index)"
            >
              {{ player.stats[stat.abbreviation] }}
            </td>
            <td @click="score.input('sub', index)">
              {{ player.number }}
            </td>
            <td text-left @click="score.input('sub', index)">
              {{ player.name }}
            </td>
            <td
              v-for="stat in score.right"
              :key="stat.abbreviation"
              :class="`bg-${stat.color}-600`"
              @click=" score.input(stat.abbreviation, index)"
            >
              {{ player.stats[stat.abbreviation] }}
            </td>
            <td
              @click=" score.input('hide', index)"
            >
              x
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style>
td {
  @apply text-center min-w-12 px-2 border-b border-r border-gray-200 border-opacity-20;
}
</style>
