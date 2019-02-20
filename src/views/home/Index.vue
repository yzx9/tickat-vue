<template>
  <el-row>
    <el-col :span="8">
      <AppTodoList :height="'auto'"/>
    </el-col>
    <el-col
      v-for="card in cards"
      :key="card.id"
      :span="8"
    >
      <AppCard :card="card"/>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/models/Card'
import AppTodoList from '@/components/todolist/AppTodoList.vue'
import AppCard from '@/components/card/AppCard.vue'

@Component({
  components: {
    AppTodoList,
    AppCard
  }
})
export default class Home extends Vue {
  // TODO: Delete Demo Data, Post True Data
  public cards: Card[] = [
    new Card(
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
.warp {
  .header {
    padding: 0px;
  }
}
</style>
