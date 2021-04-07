<template>
  <div id="nav">
    <router-link to="/">
    <i class="iconfont icon-icon-test"></i>
    主页
    </router-link>
    <router-link to="/order">
    <i class="iconfont icon-gouwuche"></i>
    订单
    </router-link>
    <router-link to="/info">
    <i class="iconfont icon-yonghu"></i>我的</router-link>
  </div>
  <router-view/>
</template>

<style lang="less">
@import "assets/css/base.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#title {
  padding: 10px;
  font-size: 16px;
  color: var(--color-background);
  background-color: var(--color-high-text);
  position: fixed;
  width: 100%;
}

#nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  background-color: white;
  z-index: 9;

  a {
    display: block;
    height: 50px;
    flex-grow: 1;
    font-weight: bold;
    color: #2c3e50;
    font-size: 14px;
    i {
      display: block;
      margin-top: 8px;
    }

    &.router-link-exact-active {
      color: var(--color-high-text);
    }
  }
}
</style>
