<script setup>
import {computed} from "vue";

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

const props = defineProps({
  latestBlogs: Array
})
</script>

<template>
  <div class="latest-blogs-tem">
    <div class="latest-blogs-tem-title">
      <h2>最新博客</h2>
      <hr>
    </div>
    <div class="latest-blogs-tem-content">
      <div style=""
           v-for="(blog, index) in latestBlogs" :key="index">
        <div style="text-align: center; ">
          <router-link :to="'/blog/' + blog.id" style="text-decoration: none; ">
            {{ blog.title }}
          </router-link>
        </div>
        <div style=''>
          <p>{{blog.content}}</p>
          <p>创建时间：{{getTimeString(blog.creationTime)}}</p>
          <p>作者：{{blog.username}}</p>
          <p>论坛名：{{blog.forumName}}</p>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>