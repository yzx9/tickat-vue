<template>
  <el-row :class="$style.warpper">
    <el-col :span="24">
      <el-carousel :interval="4000" :type="type" height="400px">
        <el-carousel-item
          v-for="banner in banners"
          :key="banner"
          :class="$style.imgWrapper"
        >
          <img :src="publicPath + banner" :class="$style.img" />
        </el-carousel-item>
      </el-carousel>
    </el-col>
    <el-col v-for="post in posts" :key="post.id" :xs="{ span: 24 }" :span="8">
      <AppPost :post="post" :class="$style.item" />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import AppPost from '@/components/dashboard/post/Post.vue'
import { Post, PostType } from '@/models/Post'
import { mockPost } from '@/utils/mockPost'

@Component({
  components: { AppPost }
})
export default class Index extends Vue {
  @State('clientWidth') clientWidth!: number
  publicPath = process.env.BASE_URL
  banners = ['images/banner1.jpg', 'images/banner2.jpg', 'images/banner3.jpg']

  get type() {
    return this.clientWidth >= 768 ? 'card' : null
  }

  // TODO: API
  posts: Post[] = mockPost(1, 10)
}
</script>

<style lang="scss" module>
.warpper {
  margin: 0 50px;
}

.item {
  margin: 20px 10px;
}

.imgWrapper {
  text-align: center;
  .img {
    height: 100%;
  }
}
</style>
