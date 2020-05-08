<template>
  <el-row
    :gutter="20"
    :class="$style.footer"
  >
    <el-col
      :span="20"
      :class="$style.left"
    >
      <VoteIcon
        :type="voteIcons.upvote"
        @click="handleClick"
      />
      <VoteIcon
        :type="voteIcons.downvote"
        @click="handleClick"
      />
      <!-- <VoteIcon
        :type="voteIcons.repost"
        @click="handleClick"
      />-->
      <VoteIcon
        :type="voteIcons.favorite"
        @click="handleClick"
      />
      <VoteIcon
        :type="voteIcons.comment"
        @click="handleClick"
      />
    </el-col>
    <el-col
      :span="4"
      :class="$style.right"
    >
      <VoteIcon
        :type="voteIcons.share"
        @click="handleClick"
      />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Post, Type } from '@/models/Post'
import VoteIcon, { VoteIconType } from '@/components/widgets/VoteIcon.vue'

@Component({
  components: {
    VoteIcon
  }
})
export default class PostFooter extends Vue {
  @Prop({ type: Object, required: true }) post!: Post
  voteIcons = {
    upvote: {
      id: 'upvote',
      icon: 'icon-Upvote'
    },
    downvote: {
      id: 'downvote',
      icon: 'icon-Downvote'
    },
    repost: {
      id: 'repost',
      icon: 'icon-Repost'
    },
    favorite: {
      id: 'favorite',
      icon: 'icon-Favorite_Full',
      text: this.post.favorite
    },
    comment: {
      id: 'comment',
      icon: 'icon-Comment_Full',
      text: this.post.comment
    },
    share: {
      id: 'share',
      icon: 'icon-Share'
    }
  }

  handleClick(id: string) {
    this.$emit(id)
  }
}
</script>

<style lang="scss" module>
.footer {
  margin-top: 10px;
  .left div {
    margin-right: 20px;
  }
  .right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
