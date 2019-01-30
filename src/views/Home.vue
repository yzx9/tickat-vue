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
  public posts = [
    {
      author: 'Yuan',
      avatar: 'images/avatars/avatar-11.png',
      createTime: new Date('2019/1/27 12:38:32'),
      content: '1',
      image: 'images/microphone-1209816_1920.jpg',
      favorite: 1274,
      comment: 982,
    },
    {
      author: 'Yuan',
      avatar: 'images/avatars/avatar-12.png',
      createTime: new Date('2019/1/30 12:38:32'),
      content: '2',
      image: 'images/microphone-1209816_1920.jpg',
      favorite: 1274,
      comment: 982,
    },
    {
      author: 'Yuan',
      avatar: 'images/avatars/avatar-13.png',
      createTime: new Date('2019/1/30 14:38:32'),
      content: '3',
      image: 'images/microphone-1209816_1920.jpg',
      favorite: 1274,
      comment: 982,
    },
    {
      author: 'Yuan',
      avatar: 'images/avatars/avatar-13.png',
      createTime: new Date('2019/1/30 14:38:32'),
      content: '3',
      image: 'images/microphone-1209816_1920.jpg',
      favorite: 1274,
      comment: 982,
    },
  ]
}
</script>
