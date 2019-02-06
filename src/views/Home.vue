<template>
  <div>
    <TheNav/>
    <el-row>
      <el-col :span="8">
        <AppTodoList/>
      </el-col>
      <el-col
        v-for="post in posts"
        :key="post.id"
        :span="8">
        <AppPost :post="post"/>
      </el-col>
      <el-col
        v-for="card in cards"
        :key="card.id"
        :span="8">
        <AppCard :card="card"/>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Post, Type } from '@/assets/scripts/Post';
import Card from '@/assets/scripts/Card';
import TheNav from '@/components/TheNav.vue';
import AppTodoList from '@/components/AppTodoList.vue';
import AppPost from '@/components/AppPost.vue';
import AppCard from '@/components/AppCard.vue';

@Component({
  components: {
    TheNav,
    AppTodoList,
    AppPost,
    AppCard,
  },
})
export default class Home extends Vue {
  public posts: Post[] = [
    new Post(
      'post-1',
      Type.image,
      'Yuan',
      'images/avatars/avatar-11.png',
      new Date('2019/1/27 12:38:32'),
      '1',
      'images/microphone-1209816_1920.jpg',
      1,
      1234,
    ),
    new Post(
      'post-2',
      Type.image,
      'Yuan',
      'images/avatars/avatar-12.png',
      new Date('2019/1/28 12:38:32'),
      '2',
      'images/microphone-1209816_1920.jpg',
      12,
      123,
    ),
    new Post(
      'post-3',
      Type.image,
      'Yuan',
      'images/avatars/avatar-13.png',
      new Date('2019/1/29 12:38:32'),
      '3',
      'images/microphone-1209816_1920.jpg',
      123,
      12,
    ),
    new Post(
      'post-4',
      Type.image,
      'Yuan',
      'images/avatars/avatar-14.png',
      new Date('2019/1/30 12:38:32'),
      '4',
      'images/microphone-1209816_1920.jpg',
      1234,
      1,
    ),
  ];
  public cards: Card[] = [
    new Card (
      'card-1',
      'Yuan',
      'images/avatars/avatar-11.png',
      new Date('2019/1/27 12:38:32'),
      '123',
      'images/hamburger.png',
    ),
  ];
}
</script>
