<template>
  <div>
    <app-nav></app-nav>
    <el-row>
      <el-col :span="8">
        <app-todo-list></app-todo-list>
      </el-col>
      <el-col v-for="post in posts"
              :span="8">
        <app-post :post="post"></app-post>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Post, Type } from '@/assets/scripts/Post';
import AppNav from '@/components/AppNav.vue';
import AppTodoList from '@/components/AppTodoList.vue';
import AppPost from '@/components/AppPost.vue';

@Component({
  components: {
    AppNav,
    AppTodoList,
    AppPost,
  },
})
export default class Home extends Vue {
  public posts: Post[] = [
    new Post(
      '1',
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
      '2',
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
      '3',
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
      '4',
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
}
</script>
