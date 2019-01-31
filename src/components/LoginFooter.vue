<template>
  <div class="footer">
    <p class="title">第三方登录</p>
    <div class="social">
      <a
        @click="clickHandle('qq')"
        class="btnSocial btnSocial-qq">
        <i
          class="fa fa-qq"
          aria-hidden="true"/>
      </a>
      <a
        @click="clickHandle('wechat')"
        class="btnSocial btnSocial-wechat">
        <i
          class="fa fa-weixin"
          aria-hidden="true"/>
      </a>
      <a
        @click="clickHandle('github')"
        class="btnSocial btnSocial-github">
        <i
          class="fa fa-github"
          aria-hidden="true"/>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class LoginFooter extends Vue {
  public href = {
    qq: '',
    wechat: '',
    github: '',
  };

  public clickHandle(name: string) {
    switch(name) {
      case 'qq':
        window.location.href = this.href.qq;
        break;
      case 'wechat':
        window.location.href = this.href.wechat;
        break;
      case 'github':
        window.location.href = this.href.github;
        break;
    }
  }
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
      &-qq {
        background-color: #12b7f5;
      }
      &-wechat {
        background-color: #44b549;
      }
      &-github {
        background-color: #24292e;
      }
      &-facebook {
        background-color: #3b5998;
      }
      &-twitter {
        background-color: #55acee;
      }
      &-google {
        background-color: #dd4b39;
      }
      &-pinterest {
        background-color: #cb2027;
      }
      &-btc {
        background-color: #ff6600;
      }
      &-tumblr {
        background-color: #32506d;
      }
      &-vk {
        background-color: #45668e;
      }
      &-reddit {
        background-color: #5f99cf;
      }
    }
  }
}
</style>
