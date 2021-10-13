<template>
  <div class="about">

    <v-side-bar/>

    <div class="content-box" :class="{ 'content-collapse': collapse }">

      <v-header/>
      <v-tags></v-tags>

      <div class="content" style="height: calc(100vh - 90px);">
        <router-view v-slot="{Component}">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </div>

    </div>

  </div>
</template>

<script>
import vHeader from '../components/Header.vue'
import vSideBar from '../components/SideBar.vue'
import vTags from '../components/Tags.vue'
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "Home",
  components: {vHeader, vSideBar, vTags},
  setup() {
    const store = useStore()

    const tagsList = computed(() => {
      store.state.tagsList.map((item) => item.name)
    })

    const collapse = computed(() => store.state.collapse)

    return {
      tagsList,
      collapse
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  width: 100%;
  height: 100%;
}
</style>