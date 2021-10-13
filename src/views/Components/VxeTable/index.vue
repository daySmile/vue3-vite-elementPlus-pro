<template>
  <div class='VxeInfo'>
    <div class='info'>
      <el-divider content-position='left'>Vxe table</el-divider>
      <span style='text-align: left'>二次封装table，table更加多样化，地址：
      <a href="https://xuliangzhan_admin.gitee.io/vxe-table/v4/table/start/quick">
        vxe table
      </a>
      </span>
    </div>
    <el-row>
      <el-col :offset='1' :span='22'>
        <div class='grid-content bg-purple-dark'>
          <el-card class='box-card'>
            <template #header>
              <div class='card-header'>
                <span>基本使用</span>
                <div></div>
              </div>
            </template>
            <div>

              <vxe-table border :data="tableData">
                <vxe-column type="seq" width="60"></vxe-column>

                <vxe-column field="name" title="Name">
                  <template #default="{ row }">
                    <span>自定义插槽模板 {{ row.name }}</span>
                  </template>
                </vxe-column>

                <vxe-column field="sex" title="Sex"></vxe-column>
                <vxe-column field="age" title="Age"></vxe-column>
              </vxe-table>

              <vxe-grid v-bind="gridOptions">
                <template #name="{ row }">
                  <span>自定义插槽模板 {{ row.name }}</span>
                </template>
              </vxe-grid>

            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {ref, reactive} from 'vue'

export default {
  setup() {
    const tableData = ref([
      {id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃'},
      {id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou'},
      {id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai'},
      {id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai'}
    ])

    const gridOptions = reactive({
      border: true,
      columns: [
        {type: 'seq', width: 50},
        {field: 'name', title: 'Name', slots: {default: 'name'}},
        {field: 'sex', title: 'Sex', showHeaderOverflow: true},
        {field: 'address', title: 'Address', showOverflow: true}
      ],
      data: [
        {id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃'},
        {id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou'},
        {id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai'},
        {id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai'}
      ]
    })

    return {
      tableData,
      gridOptions
    }
  }
}
</script>

<style lang="scss" scoped>
.VxeInfo {
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

</style>