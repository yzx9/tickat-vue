<template>
  <el-card
    shadow="hover"
    :class="$style.wrapper"
  >
    <template slot="header">
      <el-input
        :placeholder="placeholder"
        v-model="query"
      >
        <template slot="append">
          <i
            class="el-icon-menu"
            @click="onModeChange"
          />
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
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

@Component({
  components: {}
})
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
    let groups: TreeNode[]
    if (this.flag) {
      groups = this.myGroups
    } else {
      groups = this.allGroups
    }
    return groups
  }
  get filter() {
    return this.total
      .filter(a => {
        let label = a.label.toLowerCase()
        let query = this.query.toLowerCase()
        return label.indexOf(query) >= 0
      })
      .slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
  }
  get placeholder() {
    if (this.flag) {
      return '我的圈子'
    } else {
      return '全部圈子'
    }
  }
  get emptyText() {
    if (this.query === '') {
      return '暂无数据'
    } else {
      return '无匹配圈子'
    }
  }
  // Hooks
  mounted() {
    for (let i = 0; i <= 6; i++) {
      this.myGroups.push({
        id: `${i}`,
        label: `group ${i}`,
        src: `${i}`
      })
    }
    for (let i = 0; i <= 11; i++) {
      this.allGroups.push({
        id: `${i}`,
        label: `group ${i}`,
        src: `${i}`
      })
    }
  }
  // Methods
  onModeChange() {
    this.flag = !this.flag
    this.query = ''
  }
  onNodeClick(node: TreeNode) {
    let regs = {
      filter: /-filter/,
      edit: /-edit/,
      exit: /-exit/,
      join: /-join/
    }
    let id = node.id.substr(0, node.id.indexOf('-'))
    if (regs.filter.test(node.id)) {
      // console.log('filter')
    } else if (regs.edit.test(node.id)) {
      // console.log('edit')
    } else if (regs.exit.test(node.id)) {
      this.myGroups.map(a => {
        if (a.id === id) {
          this.myGroups.splice(this.myGroups.indexOf(a), 1)
        }
      })
    }
  }
  onCurrentChange(current: number) {
    this.currentPage = current
  }
  loadNode(node: any, resolve: (treeNode: TreeNode[]) => void) {
    // console.log(node)
    if (node.level === 0) {
      return resolve(this.filter)
    }
    if (node.level === 2) {
      return resolve([])
    }

    let id = node.data.id
    let flag = 0
    for (let a of this.myGroups) {
      if (a.id === id) {
        return resolve([
          {
            id: `${id}-filter`,
            label: '查看',
            isLeaf: true
          },
          {
            id: `${id}-edit`,
            label: '编辑',
            isLeaf: true
          },
          {
            id: `${id}-exit`,
            label: '退出',
            isLeaf: true
          }
        ])
      }
    }
    return resolve([
      {
        id: `${id}-filter`,
        label: '查看',
        isLeaf: true
      }
    ])
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
