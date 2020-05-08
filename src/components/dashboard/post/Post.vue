<template>
  <el-card shadow="hover">
    <template slot="header">
      <PostHeader :post="post"/>
    </template>
    <PostContent :post="post"/>
    <PostFooter
      :post="post"
      @upvote="handleUpvote"
      @downvote="handleDownvote"
      @favorite="handleFavorite"
      @comment="handleComment"
      @share="handleShare"
    />
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Post, Type } from '@/models/Post'
import PostHeader from '@/components/dashboard/post/PostHeader.vue'
import PostContent from '@/components/dashboard/post/PostContent.vue'
import PostFooter from '@/components/dashboard/post/PostFooter.vue'

@Component({
  components: {
    PostHeader,
    PostContent,
    PostFooter
  }
})
export default class AppPost extends Vue {
  @Prop({ type: Object, required: true }) post!: Post
  handleUpvote() {
    console.log('handleUpvote')
  }
  handleDownvote() {
    console.log('handleDownvote')
  }
  handleFavorite() {
    console.log('handleFavorite')
  }
  handleComment() {
    console.log('handleComment')
  }
  handleShare() {
    console.log('handleShare')
  }
}
</script>

<style lang="scss" module>
</style>
