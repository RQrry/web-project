<template>
  <div class="add">
    <p>标题</p>
    <input type="text" v-model="title" v-focus>
    <p>内容</p>
    <textarea v-model="content"></textarea>
    <div class="buttons">
      <button type="button" @click="add">完成</button>
      <button type="button" @click="cancel">取消</button>
    </div>
  </div>
</template>

<script>
import store from '@/store'
let id = 0

export default {
  name: 'Add',
  store,
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    add () {
      if (this.title) {
        store.commit('addItem', {
          id: id++,
          title: this.title,
          content: this.content,
          date: new Date().toLocaleString()
        })
        this.title = ''
        this.content = ''
        this.$router.push('/home/user')
      } else {
        alert('请输入标题和内容')
      }
    },
    cancel () {
      this.$router.push('/home/user')
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add {
  padding: 10px;
  p {
    text-align: left;
    margin-bottom: 5px;
  }
  input,
  textarea {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    padding: 0 5px;
    box-sizing: border-box;
    outline: none;
  }
  input {
    height: 30px;
    line-height: 30px;
  }
  textarea {
    height: 300px;
    line-height: 20px;
    resize: none;
  }
  .buttons {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    button {
      width: 49%;
      height: 40px;
      line-height: 40px;
      border: 1px solid #42b983;
      border-radius: 5px;
      color: #42b983;
      background-color: #fff;
      outline: none;
      &:active {
        background-color: #42b983;
        color: #fff;
      }
    }
  }
}
</style>
