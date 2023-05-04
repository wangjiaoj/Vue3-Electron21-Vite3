<template>
  <div :class="['logo-container', isCollapse ? 'logo-container-collapse' : '']">
    <div>
      <div class="logo">
        <img :class="['logo-img', isCollapse ? 'mini-logo-img' : '']" :src="logo" />
        <span v-if="!isCollapse">点到</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
// 引入本地图片方法
import { imgLocalUrl } from "@/render/utils/imgLocalUrl";
// 引入store
import { useAppStore } from "@/render/store/modules/app";

// 引入icon
const logo = imgLocalUrl("@/assets/layout/logo.png");

const appStore = useAppStore();
const isCollapse = computed(() => {
  return appStore.isCollapse;
});
</script>

<style lang="scss" scoped>
//.sidebarLogoFade-enter-active {
//  transition: opacity 1.5s;
//}
//
//.sidebarLogoFade-enter,
//.sidebarLogoFade-leave-to {
//  transition: opacity 1.5s;
//  opacity: 0;
//}
.logo-container:not(.logo-container-collapse) {
  height: $sideBarLogoExpandHeight;
}
.logo-container {
  width: 100%;
  height: $sideBarLogoHeight;
  background: var(--menu-bg-color);
  padding-top: 24px;
  padding-bottom: 39px;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    .logo-img {
      width: 35px;
      height: 35px;
      display: block;
      margin-right: 8px;
    }
    .mini-logo-img {
      width: 30px;
      height: 30px;
      margin-right: 0px;
    }
    span {
      font-size: 20px;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
    }
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar {
      width: 64px;
      height: 64px;
      margin-top: 41px;
      margin-bottom: 11px;
    }
    .mini-avatar {
      width: 44px;
      height: 44px;
    }
    p {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>
