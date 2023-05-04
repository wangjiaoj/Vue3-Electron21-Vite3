<template>
  <div class="tip-container">
    <i-ep-Expand
      v-if="isCollapse"
      class="mini-icon"
      @click="handleSetCollapse(false)"
    ></i-ep-Expand>
    <i-ep-Fold v-else class="mini-icon" @click="handleSetCollapse(true)"></i-ep-Fold>
  </div>
</template>

<script lang="ts" setup>
// 引入本地图片方法
import { imgLocalUrl } from "@/render/utils/imgLocalUrl";
import { useAppStore } from "@/render/store/modules/app";
import { computed } from "vue";

const appStore = useAppStore();
const isCollapse = computed(() => {
  return appStore.isCollapse;
});
const handleSetCollapse = (e: Boolean) => {
  appStore.setCollapse(e);
};
</script>

<style lang="scss" scoped>
.tip-container {
  position: absolute;
  left: 25px;
  bottom: 27px;
  display: flex;
  align-items: center;

  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
  .mini-icon {
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
