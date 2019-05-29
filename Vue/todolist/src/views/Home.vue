<template>
  <div>
    <router-view></router-view>
    <ul class="tabs">
      <li>
        <router-link :to="{name: 'list'}">清单列表</router-link>
      </li>
      <li>
        <router-link :to="{name: 'user'}">个人中心</router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
.tabs {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #42b983;
  li {
    width: 50%;
    list-style: none;
    a {
      display: block;
      color: #42b983;
      text-decoration: none;
      &.router-link-active {
        color: #fff;
        background-color: #42b983;
      }
    }
  }
}
</style>
