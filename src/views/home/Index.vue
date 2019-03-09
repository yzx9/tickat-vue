<template>
  <el-row :class="$style.wrapper">
    <el-col
      :xs="{ span: 12,offset: 0 }"
      :sm="{ span: 9, offset: 3 }"
    >
      <Pomodoro :class="$style.item"/>
    </el-col>
    <el-col
      :span="9"
      :xs="{ span: 12 }"
    >
      <TodoList
        :class="$style.item"
        :height="'337px'"
      />
    </el-col>
    <el-col
      :xs="{ span: 24, offset: 0 }"
      :sm="{ span: 18, offset: 3 }"
    >
      <Wallfall
        :column="2"
        :grp="10"
      >
        <WallfallItem
          v-for="card in cards"
          :key="card.id"
        >
          <div :class="$style.MaxWidth">
            <Card
              :class="$style.item"
              :card="card"
            />
          </div>
        </WallfallItem>
      </Wallfall>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CardClass from '@/models/Card'
import TodoList from '@/components/dashboard/todolist/TodoList.vue'
import Card from '@/components/dashboard/card/Card.vue'
import Pomodoro from '@/components/dashboard/pomodoro/Pomodoro.vue'
import { Wallfall, WallfallItem } from '@/utils/Wallfall'

@Component({
  components: {
    TodoList,
    Card,
    Pomodoro,
    Wallfall,
    WallfallItem
  }
})
export default class Home extends Vue {
  // TODO: Delete Demo Data, Post True Data
  public cards: CardClass[] = []

  // Hooks
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.cards.push(
        new CardClass(
          `card-${i}`,
          'Yuan',
          'images/avatars/avatar-11.png',
          new Date('2019/1/27 12:38:32'),
          '123',
          'images/hamburger.png'
        )
      )
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  margin: 0 30px;
}
.item {
  // border: 1px solid #ccc;
  // padding: 10px;
  margin: 20px 10px;
  margin-top: 0px;
}
.MaxWidth {
  width: 100%;
}
</style>
