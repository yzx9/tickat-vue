<template>
  <div :class="$style.footer">
    <div :class="$style.left">
      <VoteIcon
        v-for="icon in voteIcons.left"
        :key="icon.id"
        :type="icon"
        @click="handleClick"
      />
    </div>
    <div :class="$style.right">
      <VoteIcon
        v-for="icon in voteIcons.right"
        :key="id"
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

  voteIcons = {
    left: [
      { id: 'upvote', icon: 'icon-Upvote' },
      { id: 'downvote', icon: 'icon-Downvote' },
      // { id: 'repost', icon: 'icon-Repost' },
      { id: 'favorite', icon: 'icon-Favorite_Full', text: this.post.favorite },
      { id: 'comment', icon: 'icon-Comment_Full', text: this.post.comment }
    ],
    right: [{ id: 'share', icon: 'icon-Share' }]
  }

  handleClick(id: string) {
    this.$emit(id)
  }
}
</script>

<style lang="scss" module>
.footer {
  margin: 10px 10px 0 10px;

  display: flex;
  justify-content: space-between;

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
