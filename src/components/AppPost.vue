<template>
  <el-card class="post-warpper" shadow="hover">
    <div slot="header">
      <PostHeader :post="post" />
    </div>
    <PostContent :post="post" />
    <PostFooter :post="post" />
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Post, Type } from '@/assets/scripts/Post';
import PostHeader from '@/components/PostHeader.vue';
import PostContent from '@/components/PostContent.vue';
import PostFooter from '@/components/PostFooter.vue';

@Component({
  components: {
    PostHeader,
    PostContent,
    PostFooter,
  },
})
export default class AppPost extends Vue {
  @Prop({ type: Object, required: true })
  public post!: Post;
}
</script>

<style lang="less">
.post-warpper {
  margin: 20px 10px;
}
</style>
