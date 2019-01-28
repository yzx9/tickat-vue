<template>
  <el-input type="text"
            placeholder="New Todo"
            title="Add a new todo"
            @input="input"
            :value="value"
            @keydown.enter.native="submit">
    <el-button slot="append"
               icon="el-icon-plus"
               @click="submit">
    </el-button>
  </el-input>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';

@Component
export default class TodoListInput extends Vue {
  @Model('input', { type: String }) private value!: string;

  private submit() {
    this.$emit('submit');
  }
  private input() {
    this.$emit('input', this.value);
  }
}
</script>
