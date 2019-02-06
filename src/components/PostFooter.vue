<template>
  <div :class="$style.footer">
    <a
      href="#"
      :class="$style.upvote">
      <i class="icon-Upvote"/>
    </a>
    <a
      href="#"
      :class="$style.downvote">
      <i class="icon-Downvote"/>
    </a>
    <a
      href="#"
      :class="$style.repost">
      <i class="icon-Repost"/>
    </a>
    <a
      href="#"
      :class="$style.like">
      <i class="icon-Favorite_Full"/>
      <span>{{ post.favorite }}</span>
    </a>
    <a
      href="#"
      :class="$style.comment">
      <i class="icon-Comment_Full"/>
      <span>{{ post.comment }}</span>
    </a>
    <a
      href="#"
      :class="$style.share">
      <i class="icon-Share"/>
    </a>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Post, Type } from '@/assets/scripts/Post';
import '@/assets/fonts/sharehub/style.css';

@Component
export default class PostFooter extends Vue {
  @Prop({ type: Object, required: true })
  public post!: Post;
}
</script>

<style lang="less" module>
.footer {
  a {
    margin-top: 10px;
    align-items: center;
    display: inline-flex;
    text-decoration: none;
    &.upvote,
    &.downvote,
    &.repost,
    &.like,
    &.comment,
    &.stat,
    &.options {
      margin-right: 30px;
    }
    &.like,
    &.comment {
      span {
        margin-left: 15px;
      }
    }
    &.stat {
      position: relative;
    }
    &.repost {
      i {
        font-size: 23px;
      }
    }
    &.share {
      margin-left: auto;
    }
    & > i {
      font-size: 20px;
      cursor: pointer;
    }
    & > i,
    & > span {
      color: #a1a5ae;
      transition: 0.4s;
    }
    &.active > i,
    &:hover > i,
    &.active > span,
    &:hover > span {
      color: #1e1633;
    }
  }
}
</style>

