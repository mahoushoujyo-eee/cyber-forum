<script setup>
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {watch, ref, reactive} from "vue";
import axiosInstance from "../axios/request.js";

const route = useRoute();
let id = ref(route.params.id);
const blogs = reactive([]);
let forum = reactive({
  name: '',
  id: 0,
  ownerId : 0
})

onBeforeRouteUpdate((to, from, next) => {
  id.value = to.params.id;
  next();
});

axiosInstance.get('/api/forum/' + id.value).then(res =>
{
  forum = reactive(res.data.data)
  console.log(forum)
}).catch(err =>
{
  alert(err)
})

axiosInstance.get('/api/forum/' + id.value + '/blog/1').then(res =>
{
  console.log(res)
  const response = res.data
  blogs.value = response.data.data
  console.log(blogs.value)
}).catch(err =>
{
  alert(err)
})

</script>

<template>
<h2 style="text-align: center" :id="forum.name">{{forum.name}}</h2>
  <hr>
  <div v-for="blog in blogs">
    <div>
      <router-link to=''>{{blog.title}}</router-link>
    </div>
    <p>{{blog.content}}</p>
    <p>{{blog.creationTime}}</p>
    <p>{{blog.username}}</p>
    <hr>
  </div>
</template>

<style scoped>

</style>