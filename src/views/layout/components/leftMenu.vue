<template>
  <div class="menu-container">
    <a-menu
      :default-selected-keys="['Index']"
      :default-open-keys="['Home']"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <a-sub-menu v-for="route in routes" :key="route.name">
        <span slot="title">
          <a-icon :type="route.meta.icon" />
          <span>{{ route.meta.title }}</span>
        </span>
        <a-menu-item v-for="child in route.children" :key="child.name">
          <a-icon :type="child.meta.icon" />
          {{ child.meta.title }}
          <router-link :to="{ name: child.name }"></router-link>
        </a-menu-item>
        <!-- <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11"> Option 11 </a-menu-item>
          <a-menu-item key="12"> Option 12 </a-menu-item>
        </a-sub-menu> -->
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: [],
    };
  },
  created() {
    const r = this.$store.state.menuRoute;
    this.routes = r.filter((it) => {
      const c = it;
      if (it.children) {
        const { children } = c;
        c.children = children.filter((i) => i.meta.showBar);
      }
      return it.meta.showBar;
    });
  },
};
</script>

<style>
</style>
