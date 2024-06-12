<script setup>
import {User, Lock} from '@element-plus/icons-vue'
import {ref} from 'vue'
import {ElMessage} from "element-plus";
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
//定义数据模型
const registerData = ref({
  username: '',
  password: '',
  rePassword: ''
})
// 定义常量
const username = ref('admin')
const password = ref('123456')
// 持久化存储全局变量
import {useTokenStore} from "@/stores/token.js";
const userTokenStore = useTokenStore()
//校验密码的函数
const checkRePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请在次确认密码'))
  } else if (value !== registerData.value.password) {
    callback(new Error('请确保两次输入的密码一致'))
  } else {
    callback()
  }
}

//定义校验规则
const rules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 5, max: 16, message: '长度为5~16位的非空字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 5, max: 16, message: '长度为5~16位的非空字符', trigger: 'blur'}
  ],
  rePassword: [
    {validator: checkRePassword, trigger: 'blur'}
  ]
}

const register = () => {
  username.value=registerData.value.username
  password.value=registerData.value.password
  ElMessage.success('注册成功')
}
//用户登录
import {useRouter} from "vue-router";

let router = useRouter();

const login = () => {
  if (registerData.value.username === username.value && registerData.value.password === password.value){
    ElMessage.success('登录成功')
    userTokenStore.setToken("wszqj")
    router.push('/')
  }
}

const clearRegisterData = () => {
  registerData.value = {
    username: '',
    password: '',
    rePassword: ''
  }
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="6" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-card ref="card">
        <div class="tools">
          <div class="circle">
            <span class="red box"></span>
          </div>
          <div class="circle">
            <span class="yellow box"></span>
          </div>
          <div class="circle">
            <span class="green box"></span>
          </div>
        </div>
        <div class="card__content">
          <transition name="fade">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
              <el-form-item>
                <h1 class="titleFont">注册</h1>
              </el-form-item>
              <el-form-item prop="username">
                <el-input :prefix-icon="User" id="register_username" placeholder="请输入用户名"
                          v-model="registerData.username"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input :prefix-icon="Lock" id="register_password" type="password" placeholder="请输入密码"
                          v-model="registerData.password"></el-input>
              </el-form-item>
              <el-form-item prop="rePassword">
                <el-input :prefix-icon="Lock" id="register_rePassword" type="password" placeholder="请再次输入密码"
                          v-model="registerData.rePassword"></el-input>
              </el-form-item>
              <!-- 注册按钮 -->
              <el-form-item>
                <el-button id="register" class="button" type="primary" auto-insert-space @click="register()">
                  注册
                </el-button>
              </el-form-item>
              <el-form-item class="flex">
                <el-link type="info" :underline="false" @click="isRegister = false; clearRegisterData()">
                  ← 返回
                </el-link>
              </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
              <el-form-item>
                <h1 class="titleFont">登录</h1>
              </el-form-item>
              <el-form-item prop="username">
                <el-input class="input" :prefix-icon="User" placeholder="请输入用户名"
                          v-model="registerData.username"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                          v-model="registerData.password"></el-input>
              </el-form-item>
              <el-form-item class="flex">
                <div class="flex">
                  <el-checkbox>记住我</el-checkbox>
                  <el-link type="primary" :underline="false">忘记密码？</el-link>
                </div>
              </el-form-item>
              <!-- 登录按钮 -->
              <el-form-item>
                <el-button id="login" class="button" type="primary" auto-insert-space @click="login()">登录</el-button>
              </el-form-item>
              <el-form-item class="flex">
                <el-link id="register_link" type="info" :underline="false"
                         @click="isRegister = true; clearRegisterData()">
                  注册 →
                </el-link>
              </el-form-item>
            </el-form>
          </transition>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  width: 100%;
  background-image: url("@/images/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat; /* 不重复图片 */
  background-position: center center; /* 图片居中显示 */
  .titleFont {
    margin: 0 auto;
  }

  // 表单背景卡片样式
  .card {
    width: 190px;
    height: 254px;
    margin: 0 auto;
    background-color: red;
    border-radius: 8px;
    z-index: 1;
  }

  .tools {
    display: flex;
    align-items: center;
    padding: 9px;
  }

  .circle {
    padding: 0 4px;
  }

  .box {
    display: inline-block;
    align-items: center;
    width: 10px;
    height: 10px;
    padding: 1px;
    border-radius: 50%;
  }

  .red {
    background-color: #ff605c;
  }

  .yellow {
    background-color: #ffbd44;
  }

  .green {
    background-color: #00ca4e;
  }

  // 表单样式
  .form {
    height: 440px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    margin-top: 200px;

    .title {
      margin: 0 auto;
    }

    // 按钮样式
    button {
      text-decoration: none;
      position: relative;
      border: none;
      font-size: 18px;
      font-family: inherit;
      cursor: pointer;
      color: #fff;
      width: 100%;
      height: 30px;
      line-height: 2em;
      text-align: center;
      background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
      background-size: 300%;
      border-radius: 30px;
      z-index: 1;
    }

    button:hover {
      animation: ani 8s linear infinite;
      border: none;
    }

    @keyframes ani {
      0% {
        background-position: 0%;
      }

      100% {
        background-position: 400%;
      }
    }

    button:before {
      content: "";
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      z-index: -1;
      background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
      background-size: 400%;
      border-radius: 35px;
      transition: 1s;
    }

    button:hover::before {
      filter: blur(20px);
    }

    button:active {
      background: linear-gradient(32deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    }


    // 登录与注册切换链接定位
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    // 输入框样式
    .el-input {
      width: 100%;
      height: 45px;
      line-height: 30px;
      border: 2px solid transparent;
      border-radius: 10px;
      outline: none;
      background-color: #f8fafc;
      color: #0d0c22;
      transition: .5s ease;
    }

    .el-input::placeholder {
      color: #94a3b8;
    }

    /* 注意这里的选择器，需要是 .el-input 而不是 input */
    .el-input:focus, .el-input:hover {
      outline: none;
      border-color: rgba(129, 140, 248, 1);
      background-color: #fff;
      /* 使用正确的 rgba 语法，而不是 rgb */
      box-shadow: 0 0 0 5px rgba(129, 140, 248, 0.3);
    }
  }
}
</style>