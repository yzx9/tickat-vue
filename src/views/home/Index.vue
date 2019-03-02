<template>
  <el-row :class="$style.wrapper">
    <el-col :span="8">
      <TodoList
        :class="$style.item"
        :height="'auto'"
      />
    </el-col>
    <el-col :span="8">
      <Pomodoro :class="$style.item"/>
    </el-col>
    <el-col
      v-for="card in cards"
      :key="card.id"
      :span="8"
    >
      <Card
        :class="$style.item"
        :card="card"
      />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CardClass from '@/models/Card'
import TodoList from '@/components/dashboard/todolist/TodoList.vue'
import Card from '@/components/dashboard/card/Card.vue'
import Pomodoro from '@/components/dashboard/pomodoro/Pomodoro.vue'

@Component({
  components: {
    TodoList,
    Card,
    Pomodoro
  }
})
export default class Home extends Vue {
  // TODO: Delete Demo Data, Post True Data
  public cards: CardClass[] = [
    new CardClass(
      'card-1',
      'Yuan',
      'images/avatars/avatar-11.png',
      new Date('2019/1/27 12:38:32'),
      '123',
      'images/hamburger.png'
    )
  ]
}
</script>

<style lang="scss" module>
.wrapper {
  margin: 0 30px;
  .item {
    margin: 20px 10px;
  }
}
</style>
