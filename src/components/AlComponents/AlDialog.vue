<template>
  <el-dialog
      :title="$slots.title ? '' : title"
      v-model="dialogFormVisible">

    <slot name="content"></slot>

    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
      >确 定</el-button
      >
    </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "AlDialog"
}
</script>

<style scoped>

</style>