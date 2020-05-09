<template>
  <el-row>
    <el-col :xs="{ span: 24 }" :span="5" :class="$style.leftBar">
      <GroupSelector />
    </el-col>
    <el-col :xs="{ span: 24 }" :span="13">
      <el-row>
        <el-col
          v-for="post in posts"
          :key="post.id"
          :xs="{ span: 24 }"
          :span="12"
        >
          <AppPost :class="$style.post" :post="post" />
        </el-col>
      </el-row>
    </el-col>
    <el-col
      :xs="{ span: 24 }"
      :span="6"
      :class="[$style.rightBar, 'hidden-xs']"
    >
      <VoteCard />
      <AdCard :class="$style.ad" />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import 'element-ui/lib/theme-chalk/display.css'
import AppPost from '@/components/dashboard/post/Post.vue'
import { Post, PostType } from '@/models/Post'
import GroupSelector from '@/components/dashboard/selector/GroupSelector.vue'
import VoteCard from '@/components/dashboard/card/VoteCard.vue'
import AdCard from '@/components/dashboard/card/AdCard.vue'
import { mockPost } from '@/utils/mockPost'

@Component({
  components: {
    AppPost,
    GroupSelector,
    VoteCard,
    AdCard
  }
})
export default class Index extends Vue {
  // TODO: API
  public posts: Post[] = mockPost(1, 4)
}
</script>

<style lang="scss" module>
.leftBar {
  padding: 10px;
  padding-left: 20px;
}
.rightBar {
  padding: 10px;
  padding-right: 20px;
}
.post {
  margin: 10px 10px;
}
.ad {
  margin-top: 10px;
}
</style>
