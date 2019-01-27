<template>
  <div class="footer">
    <p class="title">第三方登录</p>
    <div class="social">
      <a :href="qq" class="btnSocial__qq btnSocial">
        <i class="fa fa-qq" aria-hidden="true"></i>
      </a>
      <a :href="wechat" class="btnSocial__wechat btnSocial">
        <i class="fa fa-weixin" aria-hidden="true"></i>
      </a>
      <a :href="github" class="btnSocial__github btnSocial">
        <i class="fa fa-github" aria-hidden="true"></i>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class LoginFooter extends Vue {
  private qq = '';
  private wechat = '';
  private github = '';
}
</script>

<style lang="less" scoped>
.footer {
  padding-top: 40px;
  border-top: solid 1px #e6e9f1;
  .title {
    margin-bottom: 20px;
  }
  .social {
    .btnSocial {
      margin: 7.5px;
      border-radius: 50%;
      backface-visibility: hidden;
      width: 30px;
      height: 30px;
      justify-content: center;
      align-items: center;
      display: inline-flex;
      transition: 0.7s;
      text-decoration: none;
      &:hover {
        opacity: 0.6;
        filter: alpha(opacity=60);
      }
      i {
        font-size: 16px;
        color: white;
      }
      &__qq {
        background-color: #12b7f5;
      }
      &__wechat {
        background-color: #44b549;
      }
      &__github {
        background-color: #24292e;
      }
      &__facebook {
        background-color: #3b5998;
      }
      &__twitter {
        background-color: #55acee;
      }
      &__google {
        background-color: #dd4b39;
      }
      &__pinterest {
        background-color: #cb2027;
      }
      &__btc {
        background-color: #ff6600;
      }
      &__tumblr {
        background-color: #32506d;
      }
      &__vk {
        background-color: #45668e;
      }
      &__reddit {
        background-color: #5f99cf;
      }
    }
  }
}
</style>
