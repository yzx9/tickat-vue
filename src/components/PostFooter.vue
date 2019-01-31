<template>
  <div class="post-footer">
    <a
      href="#"
      class="sh-section__btn-upvote sh-btn-icon">
      <i class="icon-Upvote"/>
    </a>
    <a
      href="#"
      class="sh-section__btn-downvote sh-btn-icon">
      <i class="icon-Downvote"/>
    </a>
    <a
      href="#"
      class="sh-section__btn-repost sh-btn-icon">
      <i class="icon-Repost"/>
    </a>
    <a
      href="#"
      class="sh-section__btn-like sh-btn-icon">
      <i class="icon-Favorite_Full"/><span>{{ post.favorite }}</span>
    </a>
    <a
      href="#"
      class="sh-section__btn-comment sh-btn-icon">
      <i class="icon-Comment_Full" /><span>{{ post.comment }}</span>
    </a>
    <a
      href="#"
      class="sh-section__btn-share sh-btn-icon">
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

<style lang="less">
.post-footer {
  & .sh-btn-icon {
    margin-top: 10px;
  }
  .sh-section__btn-upvote,
  .sh-section__btn-downvote,
  .sh-section__btn-repost,
  .sh-section__btn-like,
  .sh-section__btn-comment,
  .sh-section__btn-stat,
  .sh-section__btn-options {
    margin-right: 30px;
  }
  .sh-section__btn-like span,
  .sh-section__btn-comment span {
    margin-left: 15px;
  }
  .sh-section__btn-stat {
    position: relative;
  }
  .sh-section__btn-repost i {
    font-size: 23px;
  }
  .sh-section__btn-share {
    margin-left: auto;
  }
  
  .sh-btn-icon {
    align-items: center;
    display: -moz-inline-box;
    display: -ms-inline-flexbox;
    display: -webkit-inline-flex;
    display: inline-flex;
    text-decoration: none;
    & > i {
      font-size: 20px;
      cursor: pointer;
    }
    & > i,
    & > span {
      color: #a1a5ae;
      -webkit-transition: 0.4s;
      -o-transition: 0.4s;
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

