<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu>
            <el-sub-menu>
              <template #title>
                <el-icon style="border: 10px; padding: 10px"><Position /></el-icon>热门论坛
              </template>
              <el-menu-item index="1" v-for="(forum, index) in forums" :key="index">
                <router-link :to="'/forum/' + forum.id" style="text-decoration: none">
                  <span style="font-size: 16px;">{{forum.name}}</span>
                </router-link>
              </el-menu-item>
            </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <router-link to="/" style="text-decoration: none; color: #222222;">
          <div style="display: inline; position: relative; right: 35%; top: 10%">
            <i class="iconfont icon-c" style="font-size: 30px"></i>
            <i class="iconfont icon-y" style="font-size: 30px"></i>
            <i class="iconfont icon-b" style="font-size: 30px"></i>
            <i class="iconfont icon-e" style="font-size: 30px"></i>
            <i class="iconfont icon-r" style="font-size: 30px"></i>
            <i class="iconfont icon-f" style="font-size: 30px"></i>
            <i class="iconfont icon-o" style="font-size: 30px"></i>
            <i class="iconfont icon-r" style="font-size: 30px"></i>
            <i class="iconfont icon-u" style="font-size: 30px"></i>
            <i class="iconfont icon-m" style="font-size: 30px"></i>
          </div>
        </router-link>
        <div style="display: inline; position: relative; right: 20%">
          <el-input style="width: 20%" placeholder="输入搜索内容"></el-input>
          <el-button type="primary" style="position: relative; left: 5px">搜索论坛</el-button>
          <el-button type="primary">搜索帖子</el-button>
        </div>
        <div class="toolbar" style="font-size: 16px">
          <span v-bind:ref="userName">{{userName}}</span>
          <el-dropdown @command="commandHandler">
            <el-icon style="margin-right: 8px; margin-top: 5px; font-size: 16px">
              <User />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="!isLogin" command="login">登录</el-dropdown-item>
                <el-dropdown-item v-if="!isLogin" command="register">注册</el-dropdown-item>
                <el-dropdown-item v-if="isLogin" command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <router-view :latestBlogs="latestBlogs"></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu , User, Position } from '@element-plus/icons-vue'
import axiosInstance from '../axios/request.js'
import Cookies from 'js-cookie'

let userName = ref('游客')
let isLogin = ref(false)
let latestBlogs = ref([])
let forums = ref([])
if(Cookies.get('username') !== undefined)
{
  userName.value = Cookies.get('username');
  isLogin.value = true;
}

axiosInstance.get('/api/get_latest_blogs').then(res =>
    {
      const response = res.data
      console.log(response)
      latestBlogs.value = response.data
    })

axiosInstance.get('/api/initialize_forum').then(res =>
  {
    const response = res.data
    console.log(response)
    forums.value = response.data
  })

function commandHandler(command)
{
  if (command === 'login')
    window.location.href = '/#/login'
  if (command === 'register')
    window.location.href = '/#/register'
  if (command === 'logout')
  {
    Cookies.remove('username')
    isLogin.value = false
    window.location.reload()
  }
}

</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
