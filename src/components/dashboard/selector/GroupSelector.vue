<template>
  <el-card shadow="hover" :class="$style.wrapper">
    <template slot="header">
      <el-input :placeholder="placeholder" v-model="query">
        <template slot="append">
          <i class="el-icon-menu" @click="onModeChange" />
        </template>
      </el-input>
    </template>
    <el-tree
      lazy
      accordion
      :data="filter"
      :props="props"
      :empty-text="emptyText"
      :load="loadNode"
      @node-click="onNodeClick"
    />
    <el-pagination
      small
      layout="prev, pager, next"
      :total="total.length"
      :page-size="pageSize"
      :class="$style.pagination"
      @current-change="onCurrentChange"
    />
  </el-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class GroupSelector extends Vue {
  myGroups: TreeNode[] = []
  allGroups: TreeNode[] = []
  flag = true
  query = ''
  pageSize = 5
  currentPage = 1
  props = {
    label: 'label',
    children: 'children',
    isLeaf: 'isLeaf'
  }

  get total() {
    return this.flag ? this.myGroups : this.allGroups
  }

  get filter() {
    const query = this.query.toLowerCase()
    const cur = this.currentPage
    const size = this.pageSize
    const start = (cur - 1) * size

    return this.total
      .filter(({ label }) => label.toLowerCase().indexOf(query) >= 0)
      .slice(start, start + size)
  }

  get placeholder() {
    return this.flag ? '我的圈子' : '全部圈子'
  }

  get emptyText() {
    return this.query === '' ? '暂无数据' : '无匹配圈子'
  }

  // Hooks
  mounted() {
    const mock = (i: number) => ({
      id: `${i}`,
      label: `group ${i}`,
      src: `${i}`
    })

    for (let i = 0; i <= 6; i++) {
      this.myGroups.push(mock(i))
    }
    for (let i = 0; i <= 11; i++) {
      this.allGroups.push(mock(i))
    }
  }

  // Methods
  onModeChange() {
    this.flag = !this.flag
    this.query = ''
  }

  onNodeClick(node: TreeNode) {
    const regs = {
      filter: /-filter$/,
      edit: /-edit$/,
      exit: /-exit$/,
      join: /-join$/
    }

    if (regs.filter.test(node.id)) {
      // console.log('filter')
    } else if (regs.edit.test(node.id)) {
      // console.log('edit')
    } else if (regs.exit.test(node.id)) {
      const id = node.id.substr(0, node.id.lastIndexOf('-'))
      this.myGroups = this.myGroups.filter(a => a.id === id)
    }
  }

  onCurrentChange(current: number) {
    this.currentPage = current
  }

  loadNode(node: any, resolve: (treeNode: TreeNode[]) => void) {
    // console.log(node)
    if (node.level === 0) {
      return resolve(this.filter)
    } else if (node.level === 2) {
      return resolve([])
    }

    const id = node.data.id
    const group = this.myGroups.find(a => a.id === id)
    return group
      ? resolve([
          { id: `${id}-filter`, label: '查看', isLeaf: true },
          { id: `${id}-edit`, label: '编辑', isLeaf: true },
          { id: `${id}-exit`, label: '退出', isLeaf: true }
        ])
      : resolve([{ id: `${id}-filter`, label: '查看', isLeaf: true }])
  }
}

interface TreeNode {
  id: string
  label: string
  src?: string
  children?: TreeNode[]
  isLeaf?: boolean
}
</script>

<style lang="scss" module>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
