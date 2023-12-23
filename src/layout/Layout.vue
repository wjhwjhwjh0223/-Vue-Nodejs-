<template>
  <div class="layout-wrapper">
    <app-aside></app-aside>
    <div class="layout-content">
      <app-nav></app-nav>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  import AppAside from './components/AppAside.vue'
  import AppNav from './components/AppNav.vue'
  import AppMain from './components/AppMain.vue'
  export default {
    components: {
      AppAside,
      AppNav,
      AppMain
    }
  }
</script>

<style lang="scss" scoped>
  .layout-wrapper {
    display: flex;
    height: 100vh;
    width: 100vw;
    .layout-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>