<template>
  <div>
    <el-table
        ref="alTable"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        :height="tableHeight"
        size="mini"
        border
        stripe
        @selection-change="selectLine"
        :cell-style="cellStyle"
        :header-cell-style="rowClass"
        @row-click="handleLinkClick"
        @row-dblclick="handleDbclick"

    >

      <el-table-column v-if="isSelect" type="selection" width="55"></el-table-column>
      <el-table-column type="index"></el-table-column>

      <template v-for="item in tableHeader">
        <el-table-column
            v-if="item.columnType==='slot'"
            :prop="item.field"
            :label="item.label"
            :width="item.width"
            align="center"
            :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <slot :name="item.slotName" :data="scope"/>
          </template>
        </el-table-column>

        <el-table-column
            v-else
            :prop="item.field"
            :label="item.label"
            :width="item.width"
            align="center"
            :show-overflow-tooltip="true"
        >
        </el-table-column>
      </template>

      <el-table-column fixed="right" label="操作" width="100" v-if="showOptBtn">

        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="handleDetail(scope.row)">查看</a>

          <el-popconfirm
              title="确定删除吗？"
              @confirm="handleDelate(scope.row)"
          >
            <template #reference>
              <a style="cursor: pointer">删除</a>
            </template>
          </el-popconfirm>
        </template>

      </el-table-column>

    </el-table>
    <el-pagination
        class="pagt-sty"
        background
        :page-size="10"
        :pager-count="5"
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="handleCurrentChange	"
    ></el-pagination>
  </div>
</template>

<script>
import {watch, computed, ref} from 'vue'

export default {
  name: "AlTable",
  props: {
    tableHeadConfig: {  // table head
      type: Array,
      default: () => {
        return [];
      }
    },
    tableData: {  // table data
      type: Array,
      default: () => {
        return []
      }
    },
    showOptBtn: {    //table options button
      type: Boolean,
      default: false
    },
    isSelect: {  // 选择框
      type: Boolean,
      default: false
    },
    tableHeight: {  // table height
      type: String,
      default: () => {
        return '700'
      }
    },
    totalCount: {
      type: Number,
      default: () => {
        return 0
      }
    },
    currentPage: {
      type: Number,
      default: () => {
        return 1
      }
    }
  },
  setup(props, {emit}) {
    const {
      tableHeadConfig,
      tableData,
      tableHeight,
      totalCount,
      currentPage
    } = props

    const alTable = ref(null)

    const tableHeader = computed(() => {
      return tableHeadConfig
    })

    // 详情
    const handleDetail = (row) => {
      emit('rowDetails', row)
    }

    // 删除
    const handleDelate = (row) => {
      emit('rowDelete', row)
    }

    // 勾选框
    const handleSelectionChange = (val) => {
      emit('handleSelectionChange', val)
    }

    // 复选框
    const selectLine = (val) => {
      if (alTable.selection && alTable.selection.length > 0) {
        emit('selectLine', alTable.selection);
      }
    }

    // 点击当前行
    const handleLinkClick = (row) => {
      emit('handleLinkClick', row)
    }

    // 双击当前行
    const handleDbclick = (row) => {
      emit("handleDbclick", row);
    }

    // 当前页改变
    const handleCurrentChange = (currentPage) => {
      emit("currentPageChange", currentPage);
    }

    // const renderHeader = (h, {column, $Setting}) => {
    //   console.log(h, column, $Setting)
    //   return h(
    //       'div', {style: 'margin-left: 10px;',},
    //       [
    //         h('span', {
    //           // style: 'margin-left: 5px;',
    //           on: {
    //             click: () => {
    //               emit('headerClick', false)
    //             }
    //           }
    //         }, [
    //           column.label
    //         ]),
    //       ]
    //   )
    // }

    //设置表头的颜色
    const rowClass = ({row, rowIndex}) => {
      return 'background:rgb(63 158 255) !important;color: #fff;'
    }
    //设置指定行、列、具体单元格颜色
    const cellStyle = ({row, column, rowIndex, columnIndex}) => {
      if (rowIndex % 2 == 1) { //指定坐标rowIndex ：行，columnIndex ：列
        return 'rgb(105,0,7)' //rgb(105,0,7)
      } else {
        return 'background:#fff;'
      }
    }

    watch(
        tableData,
        (newVal, oldVal) => {
          if (newVal) {
            console.log('watch data', newVal)
          }
        })

    return {
      alTable,
      tableData,
      tableHeader,
      tableHeight,
      totalCount,
      currentPage,

      rowClass,
      cellStyle,
      handleDbclick,
      selectLine,
      handleLinkClick,
      handleDetail,
      handleDelate,
      handleSelectionChange,
      handleCurrentChange
    }

  }
}
</script>

<style scoped lang="scss">
.pagt-sty {
  float: right;
  margin: 1% 0;
}

</style>