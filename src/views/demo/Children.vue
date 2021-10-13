<template>
  <div>
    <!--    <el-input :value="name" @input="$emit('update:name', $event.target.value)"></el-input>-->
    <el-input v-model="name"
              @input="$emit('update:name', name)"></el-input>
    <el-input v-model="age" @input="$emit('update:age', age)"></el-input>
  </div>
</template>

<script>
import {reactive, toRefs, watch, watchEffect} from "vue";

export default {
  name: "Children",
  props: {
    name: {
      type: String
    },
    age: {
      type: String
    },
  },
  setup(props) {
    const state = reactive(props)

    // watchEffect(() => {
    //   console.log(state.name)
    //   console.log(state.age)
    // })

    watch(()=> state.name, (newName, oldName) => {
      console.log(newName, oldName)
    })

    watch(()=> state.age, (newName, oldName) => {
      console.log(newName, oldName)
    })
  }
}
</script>

<style scoped>

</style>