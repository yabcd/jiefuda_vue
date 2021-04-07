<template>
  <div class="nav-bar">
    <div class="left">
      <slot name=left></slot>
    </div>
    <div class="center">
      <slot>捷服达</slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang='less' scoped>
.nav-bar {
  background-color: #42bbaa;
  color: #fff;
  line-height: 45px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  height: 45px;
  text-align: center;
  box-shadow: 0 2px 0px rgba(100, 100, 100, 0.1);
}
</style>