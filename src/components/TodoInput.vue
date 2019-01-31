<template>
  <input
    class="todo-input"
    title="Add a new todo"
    v-model="value"
    :placeholder="placeholder"
    @keydown.enter="submit"/>
</template>

<script lang="ts">
import { Vue, Component, Model, Prop } from 'vue-property-decorator';

@Component
export default class TodoInput extends Vue {
  @Model('input', { type: String })
  public v!: string;
  @Prop({ type: String, default:'' })
  public placeholder!: string;
  
  private get value() {
    return this.v;
  }
  private set value(value: string) {
    this.$emit('input', value);
  }

  private submit() {
    this.$emit('submit');
  }
}
</script>

<style lang="less">
.todo-input {
  border: none;
  outline: none;
  width: calc(100% - 40px);
  height: 100%;
  font-size: 130%;
  border-bottom-style: solid;
  border-bottom-width: thin;
  border-bottom-color: gray;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  margin-left: 20px;
  margin-right: 20px;
}
</style>

