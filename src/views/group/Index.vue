<template>
  <el-row>
    <el-col
      :xs="{ span: 24 }"
      :span="5"
      :class="$style.leftBar"
    >
      <GroupSelector/>
    </el-col>
    <el-col
      :xs="{ span: 24 }"
      :span="13"
    >
      <el-row>
        <el-col
          v-for="post in posts"
          :key="post.id"
          :xs="{ span: 24 }"
          :span="12"
        >
          <AppPost
            :class="$style.post"
            :post="post"
          />
        </el-col>
      </el-row>
    </el-col>
    <el-col
      :xs="{ span: 24 }"
      :span="6"
      :class="[$style.rightBar, 'hidden-xs']"
    >
      <VoteCard/>
      <AdCard :class="$style.ad"/>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import 'element-ui/lib/theme-chalk/display.css'
import AppPost from '@/components/dashboard/post/Post.vue'
import { Post, Type } from '@/models/Post'
import GroupSelector from '@/components/dashboard/selector/GroupSelector.vue'
import VoteCard from '@/components/dashboard/card/VoteCard.vue'
import AdCard from '@/components/dashboard/card/AdCard.vue'

@Component({
  components: {
    AppPost,
    GroupSelector,
    VoteCard,
    AdCard
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
.leftBar {
  padding: 10px;
  padding-left: 20px;
}
.rightBar {
  padding: 10px;
  padding-right: 20px;
}
.post {
  margin: 10px 10px;
}
.ad {
  margin-top: 10px;
}
</style>
