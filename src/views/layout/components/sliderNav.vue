<template>
  <div class="header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="$store.dispatch('asyncChangeCollapsed')"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcurmb">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>统计</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="user-info">
      <li>{{ $store.state.userData.username }} <a-icon type="down" /></li>
      <li @click="logout">退出</li>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({
        name: 'Login',
      });
    },
  },
};
</script>

<style>
</style>
