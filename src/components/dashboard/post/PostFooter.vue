<template>
  <div :class="$style.footer">
    <div :class="$style.left">
      <VoteIcon
        v-for="icon in voteIconsLeft"
        :key="icon.id"
        :type="icon"
        @click="handleClick"
      />
    </div>
    <div :class="$style.right">
      <VoteIcon
        v-for="icon in voteIconsRight"
        :key="icon.id"
        :type="icon"
        @click="handleClick"
      />
    </div>
  </div>
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
  get voteIconsLeft(): VoteIconType[] {
    return [
      {
        id: 'upvote',
        icon: 'icon-Upvote'
      },
      {
        id: 'downvote',
        icon: 'icon-Downvote'
      },
      // {
      //   id: 'repost',
      //   icon: 'icon-Repost'
      // },
      {
        id: 'favorite',
        icon: 'icon-Favorite_Full',
        text: this.post.favorite
      },
      {
        id: 'comment',
        icon: 'icon-Comment_Full',
        text: this.post.comment
      }
    ]
  }
  get voteIconsRight(): VoteIconType[] {
    return [
      {
        id: 'share',
        icon: 'icon-Share'
      }
    ]
  }
  get voteIcons(): VoteIconType[] {
    return this.voteIconsLeft.concat(this.voteIconsRight)
  }

  handleClick(id: string) {
    this.$emit(id)
  }
}
</script>

<style lang="scss" module>
.footer {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  .left,
  .options {
    margin-left: 5px;
    div {
      margin-right: 15px;
    }
  }
  .right {
    margin-right: 5px;
    div {
      margin-left: 15px;
    }
  }
}
</style>
