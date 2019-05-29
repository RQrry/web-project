<template>
  <div class="user">
    <img src="../assets/logo.png">
    <h3>{{name}}</h3>
    <h3>欢迎来到个人中心</h3>
    <button type="button" @click="add">添加</button>
  </div>
</template>

<script>
export default {
  name: 'User',
  computed: {
    name () {
      return localStorage.getItem('name')
    }
  },
  methods: {
    add () {
      this.$router.push('/add')
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  h3 {
    line-height: 30px;
  }
  button {
    width: 90%;
    height: 35px;
    line-height: 35px;
    color: #fff;
    background-color: #42b983;
    border-radius: 6px;
    border: none;
    margin-top: 20px;
    outline: none;
  }
}
</style>
