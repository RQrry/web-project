<template>
  <div id="app">
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './todo/Header'
import Footer from './todo/Footer'
import Todo from './todo/Todo'

export default {
  components: {
    Header,
    Footer,
    Todo
  }
}
</script>

<style lang="scss" scoped>
#app {
  padding: 0 20px;
}
</style>
