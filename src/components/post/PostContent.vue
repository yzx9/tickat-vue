<template>
  <div>
    <div :class="$style.content">
      <p>{{ post.content }}</p>
      <div :class="$style.image">
        <a @click="clickHandle">
          <img :src="src">
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Post, Type } from '@/models/Post'

@Component
export default class PostContent extends Vue {
  @Prop({ type: Object, required: true }) post!: Post

  get src() {
    return `${process.env.BASE_URL}${this.post.image}`
  }
  clickHandle() {
    this.$router.push({ name: 'Post', params: { id: this.post.id } })
  }
}
</script>

<style lang="scss" module>
.content {
  border-bottom: solid 1px #f3f3f3;
  p {
    text-align: left;
  }
  .image {
    position: relative;
    margin-top: 24px;
    width: 100%;
    img {
      width: 100%;
      border-radius: 6px;
    }
    .gif {
      a::after {
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
    }
    .info {
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
      @media only screen and (max-width: 1024px) {
        position: relative;
        top: -10px;
      }
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
    .curtain {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: linear-gradient(transparent 40%, rgba(0, 0, 0, 0.7));
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .text {
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
        .btn {
          margin-bottom: 24px;
          margin-right: 30px;
          border-width: 1px;
        }
      }
    }
    @media only screen and (max-width: 479px) {
      .curtain {
        position: relative;
        padding-top: 16px;
        flex-wrap: wrap;
        background-image: none;
        .btn {
          margin: 0;
          margin-bottom: 15px;
        }
        .text {
          margin: 0;
          margin-bottom: 15px;
          p {
            color: #1e1633;
          }
          span {
            color: #1e1633;
          }
        }
      }
    }
  }
  .images {
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
