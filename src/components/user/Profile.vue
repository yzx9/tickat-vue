<template>
  <div :class="$style.wrapper">
    <div>
      <img
        :class="$style.avatar"
        src="images/avatars/user.jpg"
      >
    </div>
    <div :class="$style.info">
      <div :class="$style.head">
        <div :class="$style.name">
          <span>Rocketpocket</span>
          <i v-if="user.verified">
            <img src="@/assets/fonts/sharehub/svg/Verified.svg">
          </i>
        </div>
        <Badge
          v-for="badge in user.badges"
          :key="badge.id"
          :class="$style.badge"
          :badge="badge"
          :width="'34px'"
        />
        <el-button
          type="primary"
          plain
          round
          :class="$style.follow"
        >关注</el-button>
        <VoteIcon :type="options"/>
      </div>
      <div :class="$style.statistic">
        <VoteIcon
          v-for="button in VoteIcons"
          :key="button.id"
          :type="button"
        />
      </div>
      <p>{{ user.introduction }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import Badge, { BadgeType } from '@/components/widgets/Badge.vue'
import VoteIcon, { VoteIconType } from '@/components/widgets/VoteIcon.vue'

@Component({
  components: {
    Badge,
    VoteIcon
  }
})
export default class Profile extends Vue {
  options: VoteIconType = { id: 'options', icon: 'icon-Options' }
  user = {
    avatar: 'images/avatars/user.jpg',
    badges: [
      { id: '1', icon: 'Badge_01.svg', description: 'Badge_01' },
      { id: '2', icon: 'Badge_02.svg', description: 'Badge_02' },
      { id: '3', icon: 'Badge_03.svg', description: 'Badge_03' }
    ],
    verified: true,
    post: 2608,
    followers: 12547,
    following: 238,
    upvote: 90256,
    introduction:
      'Two fish are sitting in a tank. One looks over at the other and says: "Hey, do you know how to drive this thing?"'
  }

  get avatar() {
    return `${process.env.BASE_URL}${this.user.avatar}`
  }
  get VoteIcons(): VoteIconType[] {
    return [
      {
        id: 'post',
        icon: 'icon-Post',
        text: this.user.post,
        seeDetail: true
      },
      {
        id: 'followers',
        icon: 'icon-Followers',
        text: this.user.followers,
        seeDetail: true
      },
      {
        id: 'following',
        icon: 'icon-Following',
        text: this.user.following,
        seeDetail: true
      },
      {
        id: 'upvote',
        icon: 'icon-Upvote',
        text: this.user.upvote,
        seeDetail: true
      }
    ]
  }
}
</script>

<style lang="scss" module>
.wrapper {
  border-bottom: solid 1px #e6e9f1;
  max-width: 812px;
  padding: 35px 15px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
}
.avatar {
  margin-top: 5px;
  margin-bottom: 5px;
  width: 182px;
  min-width: 182px;
  border-radius: 50%;
  overflow: hidden;
  @media only screen and (min-width: 769px) {
    margin-right: 46px;
  }
}
.info {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 5px;
  .head {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 30px;
  }
  .statistic {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-bottom: 16px;
    > div {
      margin: 5px 30px 5px 0;
    }
  }
  > p {
    color: #63616b;
    text-align: left;
  }
}
.name {
  margin: 5px 30px 5px 0;
  font-size: 24px;
  span {
    margin-right: 15px;
  }
  i img {
    width: 16px;
  }
}
.badge {
  margin-right: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
  i:not(:last-child) {
    margin-right: 16px;
  }
}
.follow {
  transition: background-color 1s;
  border-width: 1px;
  padding-left: 14px;
  padding-right: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 30px;
}
</style>
