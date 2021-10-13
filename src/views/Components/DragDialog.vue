<template>
  <div class='TableInfo'>
    <div class='info'>
      <el-divider content-position='left'>拖拽弹框</el-divider>
      <span style='text-align: left'>Vue3自定义指令进行弹框拖拽！</span>
    </div>
    <el-row>
      <el-col :offset='1' :span='22'>
        <div class='grid-content bg-purple-dark'>
          <el-card class='box-card'>
            <template #header>
              <div class='card-header'>
                <span>弹框拖拽</span>
                <div></div>
              </div>
            </template>

            <el-button type="primary" @click="handleDialogOpen">弹框拖拽</el-button>
            <div v-dialogDrag>
              <el-dialog title="弹框拖拽" v-model="editVisible" width="30%">
                <el-form label-width="70px">
                  <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                  </el-form-item>
                </el-form>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editVisible = false">确 定</el-button>
                </span>
                </template>
              </el-dialog>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import {reactive, toRefs} from "vue";

export default {
  name: "DragDialog",
  setup() {
    const state = reactive({
      editVisible: false
    })
    let form = reactive({
      name: "",
      address: "",
    });
    const handleDialogOpen = () => {
      state.editVisible = true
    }
    return {
      ...toRefs(state),
      form,
      handleDialogOpen
    }
  }
}
</script>

<style lang="scss" scoped>
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

</style>