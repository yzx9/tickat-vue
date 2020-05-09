<!-- Post详情页 -->
<template>
  <el-row :class="$style.wrapper">
    <el-col :span="16">
      <AppPost :post="main" :class="$style.item" />
    </el-col>
    <el-col :span="8">
      <AppPost
        v-for="post in posts"
        :key="post.id"
        :class="$style.item"
        :post="post"
      />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Post as PostClass, PostType } from '@/models/Post'
import AppPost from '@/components/dashboard/post/Post.vue'
import { mockPost } from '@/utils/mockPost'

@Component({
  components: {
    AppPost
  }
})
export default class Post extends Vue {
  main: PostClass | null = null
  posts: PostClass[] = []

  async created() {
    try {
      // TODO: API
      const id = this.$route.params.id
      const { data } = await this.$http.get(`/api/post/${id}`)
      data.map((post: PostClass) => {
        if (post.id === id) {
          this.main = post
        } else {
          this.posts.push(post)
        }
      })

      this.main = mockPost(1, 1)[0]
      this.posts = mockPost(2, 2)
    } catch (e) {
      // TODO
    }
  }
}
</script>

<style lang="scss" module>
.item {
  margin: 20px 10px;
}
.header {
  padding: 0px;
}
</style>
