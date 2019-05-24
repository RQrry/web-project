<template>
  <div :class="['todo-item', todo.completed ? 'completed' : '']">
    <input
      type="checkbox"
      class="toggle"
      v-model="todo.completed"
    >
    <label>{{todo.content}}</label>
    <button class="del" @click="handleDelete">x</button>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleDelete () {
      this.$emit('delete', this.todo.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-item {
  position: relative;
  font-size: 24px;
  line-height: 2.4;
  .toggle {
    position: absolute;
    display: inline-block;
    font-size: 20px;
    top: 20px;
    left: -28px;
  }
  .del {
    position: absolute;
    right: -20px;
    line-height: 2.4;
    background: transparent;
    border: none;
    outline: none;
    color: #E5E4E6;
    cursor: pointer;
    &:hover {
      color: #C0C6C9;
      transition: .8s;
    }
  }
  input[type="checkbox"]::before {
    position: absolute;
    content: "";
    width: 20px;
    height: 20px;
    display: inline-block;
    background: #fff;
  }
  input[type="checkbox"]::after {
    position: absolute;
    content: "";
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 20px;
    background: #fff;
    border-radius: 50%;
    border: 2px solid #E5E4E6;
  }
  input[type="checkbox"]:checked::after {
    position: absolute;
    content: "\2713";
    width: 20px;
    height: 20px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 20px;
    color: #E5E4E6;
  }
}
.completed {
  color: #C0C6C9;
  position: relative;
  &::after {
    position: absolute;
    content: "";
    top: 30px;
    left: 0;
    right: 0;
    border-top: 2px solid #C0C6C9;
  }
}
</style>
