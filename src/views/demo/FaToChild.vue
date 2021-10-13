<template>
  <div>
    {{ name }} {{ age }}
    <child
        v-model:name="name"
        v-model:age="age"
    ></child>
  </div>
</template>

<script>
import child from './Children.vue'
import {reactive, toRefs} from "vue";

export default {
  name: "dashboard",
  components: {
    child
  },
  setup() {
    const state = reactive({
      name: 'Lisa',
      age: '20'
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>

</style>