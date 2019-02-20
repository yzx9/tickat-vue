<!-- Post详情页 -->
<template>
  <el-row :class="$style.wrapper">
    <el-col :span="16">
      <AppPost :post="main"/>
    </el-col>
    <el-col :span="8">
      <AppPost
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Post as PostClass, Type } from '@/models/Post'
import AppPost from '@/components/post/AppPost.vue'

@Component({
  components: {
    AppPost
  }
})
export default class Post extends Vue {
  public main!: PostClass
  public posts: PostClass[] = []

  public created() {
    const id = this.$route.params.id
    // TODO: 获取数据
    this.$http
      .get(`/api/post/${id}`)
      .then(re => {
        if (re.status === 400) {
          re.data.map((post: PostClass) => {
            if (post.id === id) {
              this.main = post
            } else {
              this.posts.push(post)
            }
          })
        }
      })
      .catch(e => {
        // TODO: 获取失败
      })

    // TODO: DELETE Demo Data
    this.main = new PostClass(
      'post-1',
      Type.image,
      'Yuan',
      'images/avatars/avatar-11.png',
      new Date('2019/1/27 12:38:32'),
      '1',
      'images/microphone-1209816_1920.jpg',
      1,
      1234
    )
    this.posts.push(
      new PostClass(
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
      new PostClass(
        'post-3',
        Type.image,
        'Yuan',
        'images/avatars/avatar-13.png',
        new Date('2019/1/29 12:38:32'),
        '3',
        'images/microphone-1209816_1920.jpg',
        123,
        12
      )
    )
  }
}
</script>

<style lang="scss" module>
.header {
  padding: 0px;
}
</style>
