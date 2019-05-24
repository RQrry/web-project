<template>
  <div class="helper">
    <div class="left">{{unFinished}} items left</div>
    <div class="tabs">
      <span
        v-for="state in states"
        :key="state"
        :class="[state, filter === state ? 'act' : '']"
        @click="toggleFilter(state)"
      >{{state}}</span>
    </div>
    <div
      class="clear"
      @click="clearAllCompleted"
    >Clear completed</div>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      states: ['all', 'active', 'completed']
    }
  },
  computed: {
    unFinished () {
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  methods: {
    clearAllCompleted () {
      this.$emit('clear')
    },
    toggleFilter (state) {
      this.$emit('toggle', state)
    }
  }
}
</script>

<style lang="scss" scoped>
.helper {
  display: flex;
  justify-content: space-between;
  line-height: 3;
  color: slategrey;
  margin: 0 -30px;
  .tabs span {
    padding: 4px 8px;
    margin: 0 4px;
    cursor: pointer;
  }
  .tabs .act {
    border: 2px solid #eee;
    border-radius: 5px;
  }
  .clear {
    cursor: pointer;
  }
}
</style>
