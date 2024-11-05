<script setup lang="ts">
const score = useBasketballStore()
</script>

<template>
  <div>
    <table text-5 mx-auto cursor-pointer>
      <tr text-sm opacity-60>
        <td text-left>
          #
        </td>
        <td text-left>
          Name
        </td>
        <td v-for="stat in score.stats" :key="stat.abbreviation">
          {{ stat.abbreviation }}
        </td>
      </tr>
      <tr
        v-for="(player, index) in score.players"
        :key="player.number"
        :class="player.sub ? 'opacity-30' : ''"
      >
        <td text-left @click="score.input(index, 'sub')">
          {{ player.number }}
        </td>
        <td text-left @click="score.input(index, 'sub')">
          {{ player.name }}
        </td>
        <td
          v-for="stat in score.stats"
          :key="stat.abbreviation"
          :class="`bg-${stat.color}-600`"
          @click=" score.input(index, stat.abbreviation)"
        >
          {{ player.stats[stat.abbreviation] }}
        </td>
      </tr>
    </table>
    <div p-4>
      <button
        btn
        :opacity=" score.actions.length === 0 ? '30' : '100'"
        @click="score.undo"
      >
        Undo
      </button>
    </div>
  </div>
</template>

<style>
td {
  @apply text-center min-w-12 px-2 py-1 border-b border-gray-200 border-opacity-20;
}
</style>
