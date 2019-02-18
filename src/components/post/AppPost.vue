<template>
  <el-card
    :class="$style.wrapper"
    shadow="hover"
  >
    <template slot="header">
      <PostHeader :post="post"/>
    </template>
    <PostContent :post="post"/>
    <PostFooter :post="post"/>
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Post, Type } from '@/models/Post'
import PostHeader from '@/components/post/PostHeader.vue'
import PostContent from '@/components/post/PostContent.vue'
import PostFooter from '@/components/post/PostFooter.vue'

@Component({
  components: {
    PostHeader,
    PostContent,
    PostFooter
  }
})
export default class AppPost extends Vue {
  @Prop({ type: Object, required: true })
  public post!: Post
}
</script>

<style lang="scss" module>
.wrapper {
  margin: 20px 10px;
}
</style>
