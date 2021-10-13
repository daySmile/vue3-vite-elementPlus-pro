<template>
  <div class="zipForm">
    <div class="info">
      <el-divider content-position="left">导出Zip包</el-divider>
      <span style="text-align: left">将table中的数据导出成xlsm格式后，使用zip打包</span>
    </div>
    <el-row>
      <el-col :offset="1" :span="22">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>表格信息</span>
                <div></div>
              </div>
            </template>
            <el-button
                size="small"
                type="primary"
                @click="handleExportZip"
                style="margin-bottom: 15px"
            >
              导出excel
            </el-button>
            <el-table id="tableId" ref="tableRef" :data="tableData" border highlight-current-row>
              <el-table-column
                  v-for="item in tableColumn"
                  :key="item.prop"
                  :fixed="item.fixed"
                  :prop="item.prop"
                  :label="item.label"
                  align="center"
              >
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {reactive, ref, toRefs} from "vue";
import {useExportExcel} from "../../../utils/exportFile";

export default {
  name: "ExportExcel",
  setup() {
    const state = reactive({
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }
      ],
    })

    const tableRef = ref()

    const tableColumn = [
      {
        prop: 'date',
        fixed: true,
        label: '日期'
      },
      {
        prop: 'name',
        fixed: false,
        label: '姓名'
      },
      {
        prop: 'province',
        fixed: false,
        label: '省份'
      },
      {
        prop: 'city',
        fixed: false,
        label: '市区'
      },
      {
        prop: 'address',
        fixed: false,
        width: '400',
      },
      {
        prop: 'zip',
        fixed: false,
        label: '邮编'
      }
    ]

    // 导出操作
    const handleExportZip = () => {
      const tHeader = ['日期', '姓名', '省份', '市区', '地址', '邮编']
      const filterVal = ['date', 'name', 'province', 'city', 'address', 'zip']
      const filename = '导出测试'
      useExportExcel(tHeader, filterVal, state.tableData, filename)
    }

    return {
      tableRef,
      ...toRefs(state),
      tableColumn,
      handleExportZip
    }
  }
}
</script>

<style lang="scss" scoped>
.zipForm {
  margin-top: 20px;

  .demo-ruleForm {
    text-align: left;
    width: 500px;
    margin: 15px;


  }

  .confirmInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .infoItem {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 300px;

      .label {
        font-weight: 400;
        color: rgba(0, 0, 0, .85);
        font-size: 14px;
      }
    }

    .value {
      color: rgba(0, 0, 0, .85);
      font-size: 14px;
    }
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

  .el-step__head {
    text-align: left;
  }

}
</style>