<template>
  <div>
    <div class="post-content">
      <p>{{ post.content }}</p>
      <div class="sh-section__image">
        <a @click="clickHandle">
          <img :src="src">
        </a>
      </div>
    </div>
    <!--<div class="post-options">
      <span>Add your answer</span>
      <a href="#" class="sh-section__options-btn sh-btn-icon"><i class="icon-Submit_Tick"></i></a>
    </div>-->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Post, Type } from '@/assets/scripts/Post';

@Component
export default class PostContent extends Vue {
  @Prop({ type: Object, required: true })
  public post!: Post;
  public publicPath = process.env.BASE_URL;

  public get src() {
    return `${ this.publicPath }${ this.post.image }`;
  }

  public clickHandle() {
    this.$router.push({ name: 'post', params: { id: this.post.id }});
  }
}
</script>

<style lang="less">
.post-content {
  border-bottom: solid 1px #f3f3f3;
  p {
    text-align: left;
  }
  .sh-section__image {
    position: relative;
    margin-top: 24px;
    width: 100%;
    img {
      width: 100%;
      border-radius: 6px;
    }
    &-gif a::after {
      position: absolute;
      content: 'gif';
      display: block;
      padding: 0 4px;
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.6);
      font-weight: 700;
      font-size: 14px;
      color: #ffffff;
      text-transform: uppercase;
      right: 16px;
      top: 16px;
    }
    &-info {
      position: absolute;
      width: 100%;
      padding: 28px 24px;
      bottom: -1px;
      background-color: #ffffff;
      border-bottom-right-radius: 6px;
      border-bottom-left-radius: 6px;
      border-bottom: solid 1px #f3f3f3;
      border-left: solid 1px #f3f3f3;
      border-right: solid 1px #f3f3f3;
      div {
        font-weight: 600;
      }
      p {
        color: #63616b;
      }
      span {
        color: #9fa3ac;
      }
    }
    &-curtain {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: linear-gradient(transparent 40%, rgba(0, 0, 0, 0.7));
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      &-text {
        margin-bottom: 24px;
        margin-left: 30px;
        p {
          color: #ffffff;
          font-weight: 400;
        }
        span {
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
        }
        .sh-btn {
          margin-bottom: 24px;
          margin-right: 30px;
          border-width: 1px;
        }
      }
    }
  }
  @media only screen and (max-width: 1024px) {
    .sh-section__image-info {
      position: relative;
      top: -10px;
    }
  }
  @media only screen and (max-width: 479px) {
    .sh-section__image-curtain {
      position: relative;
      padding-top: 16px;
      flex-wrap: wrap;
      background-image: none;
    }
    .sh-section__image-curtain-text {
      margin: 0;
      margin-bottom: 15px;
    }
    .sh-section__image-curtain-text p {
      color: #1e1633;
    }
    .sh-section__image-curtain-text span {
      color: #1e1633;
    }
    .sh-section__image-curtain .sh-btn {
      margin: 0;
      margin-bottom: 15px;
    }
  }
  .sh-section__images {
    margin: 0 -5px;
    margin-top: 14px;
    flex-wrap: wrap;
    div {
      padding: 0 5px;
      margin-top: 10px;
      a {
        position: relative;
        display: block;
        &::before {
          content: '';
          display: block;
          padding-top: 66%;
        }
        img {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
      }
    }
  }
}
</style>
