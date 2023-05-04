<template>
  <div class="app-main-container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: "AppMain",
};
</script>

<style lang="scss" scoped>
.app-main-container {
  width: 100%;
  height: calc(100vh - #{$topHeaderHeight} - #{$navigationHeight});
  background: #f5f6f7;
}
</style>
