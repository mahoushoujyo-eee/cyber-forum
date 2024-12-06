<script setup>
import {reactive} from "vue";
import axiosInstance from "../axios/request.js";
import Cookies from "js-cookie";

const state = reactive({
  username: '',
  password: ''
})

const onReset = () =>
{
  state.username = ''
  state.password = ''
}

const onSubmit = () =>
{
  axiosInstance.post('/api/logIn', {userName: state.username, password: state.password}).then(res =>
  {
    const response = res.data;
    if(response.success === true)
    {
      if(response.data === true)
      {
        alert('登录成功')
        Cookies.set('username', state.username)
        window.location.href = '/'
      }
      else
        alert('用户名或密码错误')
    }
    else
      alert(response.message)
  }).catch(err =>
  {
    alert(err)
  })
}

const rules = {
  username: [{required: true, message: '用户名不能为空', trigger: 'blur'},],
  password: [{required: true, message: '密码不能为空', trigger: 'blur'},]
}
</script>

<template>
  <el-form
      :rules="rules"
      :model="state"
      style="position: relative; left: 30%; top: 200px;max-width:400px"
      label-width="auto"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="state.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="state.password"></el-input>
    </el-form-item>
    <el-form-item style="position: relative; left: 20%">
      <el-button type="primary" @click="onSubmit">登录</el-button>
      <el-button @click="onReset">重置</el-button>
      <router-link to="/register" style="text-decoration: none; padding-left: 20px">没有账号？去注册</router-link>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>