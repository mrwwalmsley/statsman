<script setup lang="ts">
const score = useBasketballStore()
const router = useRouter()
</script>

<template>
  <div>
    <div flex justify-center gap-2 p-1 text-sm>
      <Button btn @click="router.back()">
        Back
      </Button>
    </div>
    <table mx-auto>
      <tbody>
        <tr v-for="(action, index) in score.actions" :key="action.timestamp.getTime()">
          <td>{{ score.getActionTime(index) }}</td>
          <td>{{ action.action }}</td>
          <td>{{ score.players[action.index]?.number }}</td>
          <td>{{ score.players[action.index]?.name }}</td>
          <td @click="score.remove(action.timestamp)">
            x
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
