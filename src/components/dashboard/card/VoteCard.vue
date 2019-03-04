<template>
  <el-card>
    <el-form>
      <el-form-item :class="$style.topic">
        <h1>{{ topic.title }}</h1>
        <p>{{ topic.detail }}</p>
      </el-form-item>
      <el-form-item>
        <el-radio
          v-if="!isVoted"
          v-model="vote"
          label="true"
        >应该</el-radio>
        <el-progress
          v-if="isVoted"
          :text-inside="true"
          :stroke-width="18"
          :percentage="percentage.positive"
          :class="$style.progress"
        />
      </el-form-item>
      <el-form-item>
        <el-radio
          v-if="!isVoted"
          v-model="vote"
          label="flase"
        >不应该</el-radio>
        <el-progress
          v-if="isVoted"
          status="success"
          :text-inside="true"
          :stroke-width="18"
          :percentage="percentage.negative"
          :class="$style.progress"
        />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

@Component({
  components: {}
})
export default class VoteCard extends Vue {
  topic = {
    title: '学历应不应该成为涨薪的坎？',
    detail:
      '如今很多在职人员为了能够涨薪酬，提升职位而不得不通过成人教育来提高自己的学历，那么学历是否应该成为涨薪、提职的一道坎？',
    positive: 1632,
    negative: 1296
  }
  isVoted = false
  vote: boolean | null = null

  get percentage() {
    const total = this.topic.positive + this.topic.negative
    const positive = Math.floor((this.topic.positive / total) * 100)
    const negative = 100 - positive
    return {
      positive,
      negative
    }
  }

  @Watch('vote')
  onVote() {
    this.isVoted = true
  }
}
</script>

<style lang="scss" module>
.topic {
  h1 {
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 10px;
  }
  p {
    line-height: 1.3;
  }
}
.progress {
  margin-top: 11px;
  margin-bottom: 11px;
}
</style>
