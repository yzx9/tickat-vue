<template>
  <el-dialog
    :visible.sync="visible"
    :width="'30%'"
    @close="onClose"
  >
    <el-form
      ref="form"
      :model="form"
    >
      <el-form-item label="时长">
        <el-input-number
          v-model="time"
          :min="1"
          :max="100"
          :step="5"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >开始</el-button>
        <el-button @click="onClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

@Component({
  components: {}
})
export default class PomodoroDialog extends Vue {
  @Prop({ type: Boolean, required: true }) visible!: boolean
  form = {}
  time = 25

  onSubmit() {
    this.$emit('submit', this.time)
  }
  onClose() {
    this.$emit('close')
  }
}
</script>

<style lang="scss" module>
</style>
