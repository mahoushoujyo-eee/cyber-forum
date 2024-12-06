<script setup>
import {reactive} from "vue";
import axiosInstance from "../axios/request.js";

const userInfo = reactive({
  userName: '',
  password: '',
  passwordAgain: '',
  email: ''
})

const rule = reactive({
  userName: [{required: true, message: '用户名不能为空', trigger: ['blur', 'change']}],
  password: [{validator: validatePassword, trigger: ['blur', 'change']}],
  passwordAgain: [{validator: validatePasswordAgain, trigger: ['blur', 'change']}],
  email: [{type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}]
})

function validatePassword(rule, value, callback)
{
  if (value.length < 8)
    callback(new Error('密码长度不能小于8位'))
  else if (value.length > 16)
    callback(new Error('密码长度不能大于16位'))
  else if(!/^[a-zA-Z0-9]{8,16}$/.test(value))
    callback(new Error('密码不能包含特殊字符！'))
  else
    callback()
}

function validatePasswordAgain(rule, value, callback)
{
  if (value !== userInfo.password)
    callback(new Error('两次密码不一致'))
  else
    callback()
}

function register()
{
  axiosInstance.post('/api/register', userInfo).then(res =>
  {
    console.log(res)
    const response = res.data;
    console.log(response)
    if(response.success === true)
    {
      alert('注册成功，请前往登录！')
      window.location.href = '/#/login'
    }
    else
      alert(response.message)

  }).catch(err =>
  {
    alert(err)
  })
}
</script>

<template>
  <body>
    <el-form
        :rules="rule"
        :model="userInfo"
        style="max-width: 400px; position: relative; left: 30%; top: 200px;"
        label-width="auto">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="userInfo.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userInfo.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordAgain">
        <el-input v-model="userInfo.passwordAgain" type="password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item>
        <div style="position: relative; left: 30%">
          <el-button type="primary" @click="register">注册</el-button>
          <router-link to="/login" style="text-decoration: none; padding-left: 20px">已有账号，去登录</router-link>
        </div>
      </el-form-item>
    </el-form>
  </body>
</template>

<style scoped>
body
{
  background-image: url("../images/Lake01.jpg");
  background-size: cover;
  background-attachment: fixed;
  height: 97vh;
}
</style>