<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">输入字符串生成二维码</router-link> |
      <router-link to="/uploadModel">上传文件批量生成二维码</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f1f4ef;
  width: 100%;
  overflow: auto;
  height: 100vh;
  position: relative;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
