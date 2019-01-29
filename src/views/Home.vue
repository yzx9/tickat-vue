<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8">
        <app-todo-list></app-todo-list>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppTodoList from '@/components/AppTodoList.vue';

@Component({
  components: {
    AppTodoList,
  },
})
export default class Home extends Vue {

}
</script>
