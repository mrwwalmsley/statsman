<script setup lang="ts">
const score = useBasketballStore()
</script>

<template>
  <table mx-auto>
    <tr v-for="player in score.players" :key="player.number">
      <td text-left>
        {{ player.name }}
      </td>
      <td> <span text-xs>2</span> {{ player.fieldGoalsMade }}</td>
      <td> <span text-xs>2~</span> {{ player.fieldGoalsAttempted }}</td>
    </tr>
  </table>
</template>
