<script setup>
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {watch, ref, reactive, nextTick} from "vue";
import axiosInstance from "../axios/request.js";

const props = defineProps({
  id : Number
})

const isBlogsLoading = ref(false);

const blogs = ref([]);
let forum = reactive({
  name: '',
  id: 0,
  ownerId : 0
})

getForum(props.id)
getBlogs(props.id)
onBeforeRouteUpdate( (to, from, next)=>
{
  const id = to.params.id
  getForum(id)
  getBlogs(id)
  next()
})

function getForum(id)
{
  axiosInstance.get('/api/forum/' + id).then(res =>
  {
    forum.name = res.data.data.name;
    forum.id = res.data.data.id;
    forum.ownerId = res.data.data.ownerId;
  }).catch(err =>
  {
    alert(err)
  })
}

function getBlogs(id)
{
  isBlogsLoading.value = false
  axiosInstance.get('/api/forum/' + id + '/blog/1').then(res =>
  {
    const response = res.data
    if (response.data === null)
      return;
    blogs.value = response.data.data
    console.log(response.data.data)
    isBlogsLoading.value = true
  }).catch(err =>
  {
    alert(err)
  })
}

function getTimeString(date)
{
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

</script>

<template>
  <h2 style="text-align: center" :id="forum.id">{{forum.name}}</h2>
  <hr>
  <div v-if="isBlogsLoading" v-for="blog in blogs">
    <div style="text-align: center">
      <router-link :to="'/blog/' + blog.id" style="text-decoration: none">{{blog.title}}</router-link>
    </div>
    <p>{{blog.content}}</p>
    <p>发帖时间：{{getTimeString(blog.creationTime)}}</p>
    <p>作者：{{blog.username}}</p>
    <hr>
  </div>
</template>

<style scoped>

</style>