<template>
  <div class='TableInfo'>
    <div class='info'>
      <el-divider content-position='left'>封装表单和分页</el-divider>
      <span style='text-align: left'>使用slot对表单进行封装，双击进行表格行内编辑，多行编辑后，点击保存即可</span>
    </div>
    <el-row>
      <el-col :offset='1' :span='22'>
        <div class='grid-content bg-purple-dark'>
          <el-card class='box-card'>
            <template #header>
              <div class='card-header'>
                <span>表单信息</span>
                <div></div>
              </div>
            </template>
            <div class="table-container">
              <div class="btn-group">
                <el-button size="medium" type="success" plain @click="handleSave">保存</el-button>
                <el-button @click="handleAdd">新增</el-button>
              </div>
              <al-table
                  :tableHeadConfig="tableHead"
                  :table-data="tableData"
                  :isSelect="isSelect"
                  :show-opt-btn="showOptBtn"
                  :tableHeight="tableHeight"
                  :total-count="totalCount"
                  :current-page="currentPage"
                  @handleDbclick="handleDbclick"
                  @rowDetails="handleRowDetail"
                  @rowDelete="handleRowDelete"
              >

                <template v-slot:name="slotData">
                  <el-input
                      size="small"
                      v-model="slotData.data.row.name"
                      v-show="slotData.data.row.show"
                      placeholder="请输入内容">
                  </el-input>
                  <span v-show="!slotData.data.row.show" class="linkColumn">
              {{ slotData.data.row.name }}
         </span>
                </template>

                <template v-slot:address="slotData">
                  <el-input
                      size="small"
                      v-model="slotData.data.row.address"
                      v-show="slotData.data.row.show"
                      placeholder="请输入内容">
                  </el-input>
                  <span v-show="!slotData.data.row.show" class="linkColumn">
              {{ slotData.data.row.address }}
         </span>
                </template>
              </al-table>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import AlTable from '../../../components/AlComponents/AlTable.vue'
import {onMounted, reactive, ref, toRefs, provide} from "vue";

export default {
  components: {AlTable},
  setup() {
    const tableConfig = reactive({
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
      ],
      tableHead: [
        {
          label: '姓名',
          slotName: 'name',
          columnType: 'slot',
          width: "200",
        },
        {
          label: '日期',
          field: 'date',
          width: "250"
        }, {
          label: '省份',
          field: 'province',
          width: "250"
        }, {
          label: '住址',
          slotName: 'address',
          columnType: 'slot'
        }],
      tableHeight: '400',
      showOptBtn: true, // 操作按钮
      isSelect: false, // 多选框
      totalCount: 100, // 总页数
      currentPage: 5, // 当前页
    })

    // 双击事件
    const handleDbclick = (row) => {
      tableConfig.tableData.forEach(item => {
        if (item == row) {
          item.show = true
        } else {
          item.show = false
        }
      })
    }

    // 新增
    const handleAdd = () => {

      const rowAddData = {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      }
      tableConfig.tableData.push(rowAddData)
    }

    //保存
    const handleSave = () => {
      tableConfig.tableData.forEach(item => {
        item.show = false
      })
    }

    //查看详情
    const handleRowDetail = (row) => {
      alert('222')
    }

    //删除
    const handleRowDelete = (row) => {
      console.log(row)
    }

    //多选
    const handleSelectionChange = (row) => {
      console.log('select change row', row)
    }

    onMounted(() => {
      tableConfig.tableData.forEach(item => {
        item['show'] = false
      })
    })

    return {
      ...toRefs(tableConfig),
      handleDbclick,
      handleRowDetail,
      handleRowDelete,
      handleSelectionChange,
      handleAdd,
      handleSave
    }
  }
}
</script>

<style scoped lang="scss">
.TableInfo {
  margin-top: 20px;

  .demo-ruleForm {
    text-align: left;
  }

  .info {
    text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 100%;
  }
}

.linkColumn {
  color: red;
}

.table-container {

  .box-card {
    width: 100%;
  }

  .btn-group {
    margin-bottom: 2%;
  }
}

</style>
