<template>
  <div>
    <form v-if="isSignin">
      <h3>欢迎登录</h3>
      <p>
        <span>登录名</span>
        <input type="text" v-model="name">
      </p>
      <p>
        <span>密码</span>
        <input type="password" v-model="password">
      </p>
      <div class="buttons">
        <button type="button" @click="signin">登录</button>
        <button type="button" @click="signup">注册</button>
      </div>
    </form>
    <form v-else>
      <h3>请输入以下信息</h3>
      <p>
        <span>登录名</span>
        <input type="text" v-model="name">
      </p>
      <p>
        <span>密码</span>
        <input type="password" v-model="password">
      </p>
      <p>
        <span>再次输入</span>
        <input type="password" v-model="repeat">
      </p>
      <div class="buttons">
        <button type="button" @click="confirm">确定</button>
        <button type="button" @click="cancel">取消</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Sign',
  data () {
    return {
      name: '',
      password: '',
      repeat: '',
      isSignin: true
    }
  },
  methods: {
    signin () {
      if (localStorage.getItem('name') === this.name && localStorage.getItem('password') === this.password) {
        this.$router.push('/home/list')
      } else {
        alert('用户或密码输入不正确')
      }
      this.name = ''
      this.password = ''
    },
    signup () {
      this.isSignin = false
      this.name = ''
      this.password = ''
    },
    confirm () {
      if(!this.name || !this.password) {
        alert('用户名和密码不能为空')
      } else if (this.password !== this.repeat) {
        alert('两次密码输入不一致')
      } else {
        localStorage.setItem('name', this.name)
        localStorage.setItem('password', this.password)
        this.isSignin = true
        this.name = ''
      }
      this.password = ''
      this.repeat = ''
    },
    cancel () {
      this.isSignin = true
      this.name = ''
      this.password = ''
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  margin: 30px 10px 0;
  h3 {
    text-align: left;
    padding-left: 30px;
    margin-bottom: 30px;
  }
  p {
    margin-bottom: 10px;
    span {
      display: inline-block;
      width: 20%;
      text-align: right;
      padding-right: 5px;
      box-sizing: border-box;
    }
    input {
      width: 80%;
      height: 30px;
      line-height: 30px;
      border-radius: 5px;
      border: 1px solid #ccc;
      padding: 0 5px;
      box-sizing: border-box;
      outline: none;
    }
  }
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
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
