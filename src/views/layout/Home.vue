<template>
  <div class="home-container">
    <!-- 左侧菜单 -->
    <LeftMenu />
    <!-- 面包屑 -->
    <div
      class="head-container"
      :class="{ 'head-fold': $store.state.collapsed }"
    >
      <SliderNav />
    </div>
    <!-- 用户信息 -->
  </div>
</template>

<script>
import LeftMenu from './components/leftMenu.vue';
import SliderNav from './components/sliderNav.vue';

export default {
  components: {
    LeftMenu,
    SliderNav,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less">
@import url("~@/assets/css/home.less");
@import url("~@/assets/css/reset.less");
</style>
