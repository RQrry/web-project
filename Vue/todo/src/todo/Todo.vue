<template>
  <div class="todo">
    <input
      type="text"
      class="add-input"
      placeholder="接下去要做什么"
      autofocus
      @keyup.enter="addTodo"
    >
    <Item
      :todo="todo"
      v-for="todo in filteredItem"
      :key="todo.id"
      @delete="deleteItem"
    />
    <Tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clear="clearAllCompleted"
    />
  </div>
</template>

<script>
import Item from './Item'
import Tabs from './Tabs'
let id = 0

export default {
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  components: {
    Item,
    Tabs
  },
  computed: {
    filteredItem () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteItem (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style  lang="scss" scoped>
.todo {
  max-width: 800px;
  background-color: #fff;
  margin: 0 auto;
  padding: 0 40px;
  box-shadow: 0 0 5px #666;
  color: #2B2B2B;
  .add-input {
    font-size: 24px;
    width: 100%;
    line-height: 2.4;
    border: none;
    outline: none;
    color: #2B2B2B;
  }
}
</style>
