<template>
  <el-dialog
    :visible.sync="visible"
    :title="'编辑'"
    @close="onClose"
  >
    <el-form
      ref="form"
      v-if="todo"
      :model="form"
    >
      <el-form-item label="标题">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          placeholder="添加备注"
          v-model="form.content"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >提交</el-button>
        <el-button @click="onClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import Todo from '@/models/Todo'
import objectHelper from '@/utils/ObjectHelper'

@Component({
  components: {}
})
export default class TodoListEditDialog extends Vue {
  @Prop({ type: Object, default: null }) todo!: Todo
  @Prop({ type: Boolean, required: true }) visible!: boolean
  form: Todo = objectHelper.clone(this.todo)

  onSubmit() {
    this.$emit('submit', this.form)
  }
  onClose() {
    this.$emit('close')
  }
}
</script>

<style lang="scss" module>
</style>
