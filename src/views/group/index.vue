<template>
  <el-row>
    <el-col
      v-for="post in posts"
      :key="post.id"
      :span="8"
    >
      <AppPost :post="post"/>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import AppPost from '@/components/dashboard/post/Post.vue'
import { Post, Type } from '@/models/Post'

@Component({
  components: {
    AppPost
  }
})
export default class Index extends Vue {
  // TODO: Delete Demo Data, Post True Data
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
      1234
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
      123
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
      12
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
      1
    )
  ]
}
</script>

<style lang="scss" module>
</style>
