<template>
  <div class="list">
    <p v-if="!todoList.length">这里空空如也~~</p>
    <ul v-else v-show="!isActive">
      <li
        :class="['item', item.id === current ? 'active' : '']"
        v-for="item in todoList"
        :key="item.id"
        @click="toggle(item.id)"
      >
        <h3>{{item.title}}</h3>
        <p>{{item.content}}</p>
        <p>{{item.date}}</p>
        <a class="seeDetail" @click="showDetail(item.title, item.content)">查看详情>></a>
        <a class="delete" @click="deleteItem(item.id)">x</a>
      </li>
    </ul>
    <div class="detail" v-show="isActive">
      <h3>{{title}}</h3>
      <p>{{content}}</p>
      <button type="button" @click="hideDetail">返回</button>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'List',
  store,
  data () {
    return {
      current: '',
      isActive: false,
      title: '',
      content: ''
    }
  },
  computed: {
    todoList () {
      return store.state.lists
    }
  },
  methods: {
    toggle (id) {
      this.current = id
    },
    showDetail (title, content) {
      this.isActive = true
      this.title = title
      this.content = content
    },
    hideDetail () {
      this.isActive = false
      this.title = ''
      this.content = ''
    },
    deleteItem (id) {
      alert('确认删除？')
      store.commit('deleteItem', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  padding: 10px;
  .item {
    position: relative;
    height: 80px;
    text-align: left;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 2px 2px 3px #eee;
    margin-bottom: 10px;
    padding: 8px;
    list-style: none;
    overflow: hidden;
    h3 {
      border-bottom: 1px solid #eee;
      line-height: 24px;
      padding-bottom: 5px;
      margin-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 24px;
      word-break: keep-all;
    }
    .seeDetail {
      position: absolute;
      right: 10px;
      bottom: 8px;
      text-decoration: underline;
      visibility: hidden;
    }
    .delete {
      position: absolute;
      top: 4px;
      right: 6px;
      visibility: hidden;
    }
  }
  .active {
    color: #fff;
    background-color: #42b983;
    .seeDetail,
    .delete {
      visibility: visible;
      cursor: pointer;
    }
  }
  .detail {
    text-align: left;
    h3 {
      border-bottom: 1px solid #eee;
      line-height: 24px;
      padding-bottom: 5px;
      margin-bottom: 5px;
      word-break: break-all;
    }
    p {
      line-height: 24px;
      word-break: break-all;
    }
    button {
      width: 100%;
      height: 35px;
      line-height: 35px;
      color: #fff;
      background-color: #42b983;
      border-radius: 6px;
      border: none;
      margin-top: 40px;
      outline: none;
    }
  }
}
</style>
