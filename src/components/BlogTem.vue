<script setup>
import {reactive, ref} from "vue";
import axiosInstance from "../axios/request.js";
import {onBeforeRouteUpdate} from "vue-router";
import Cookies from "js-cookie";

const props = defineProps({
  id : Number
})

const blog = reactive({
  id : Number,
  title : String,
  content : String,
  author : String,
  creationTime : String,
  forumName : String
})

const comments = ref([])
const isCommentsLoading = ref(false)

const addCommentInfo = ref()

getBlog(props.id)
getComments(props.id)

onBeforeRouteUpdate((to, from, next) =>
{
  const id = to.params.id
  getBlog(id)
  getComments(id)
  next()
})

function getBlog(id)
{
  axiosInstance.get('/api/blog/' + id).then(res =>
  {
    console.log(res)
    const response = res.data
    blog.id = response.data.id
    blog.title = response.data.title
    blog.content = response.data.content
    blog.author = response.data.username
    blog.creationTime = response.data.creationTime
    blog.forumName = response.data.forumName
  }).catch(err =>
  {
    alert(err)
  })
}

function getComments(id)
{
  isCommentsLoading.value = false
  axiosInstance.get('/api/comment/' + id).then(res =>
  {
    const response = res.data;
    console.log(res)
    comments.value = response.data
    isCommentsLoading.value = true
  }).catch(err =>
  {
    alert(err)
  })
}

function submitComment()
{
  const data = {
    blogId : blog.id,
    content : addCommentInfo.value,
    userId: Cookies.get('userId')
  }
  axiosInstance.post('/api/add_comment', data).then(res =>
  {
    if (res.data.success === true)
    {
      alert("评论成功")
      getComments(blog.id)
      addCommentInfo.value = ""
    }
    else
      alert(res.data.message)
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
<h2 :ref="blog" style="text-align: center">{{blog.title}}</h2>
  <hr>
  <div>
    <div>
      <span style="font-size: 20px">作者：</span>
      <span>{{blog.author}}</span>
    </div>
    <div>
      <span style="font-size: 20px">创建时间：</span>
      <span>{{getTimeString(blog.creationTime)}}</span>
    </div>
    <div>
      <span style="font-size: 20px">所属论坛：</span>
      <span>{{blog.forumName}}</span>
    </div>
    <hr>
    <div>
      <span style="font-size: 20px">{{blog.content}}</span>
    </div>
    <hr>
    <h3>评论</h3>
    <el-input type="textarea" placeholder="输入评论内容" style="max-width: 800px" v-model="addCommentInfo"></el-input>
    <p><el-button type="primary" style="width: 80px; height: 40px" @click="submitComment">评论</el-button></p>
    <div v-if="isCommentsLoading" v-for="(comment) in comments">
      <hr>
      <p>{{ comment.content }}</p>
      <p>评论时间：{{ getTimeString(comment.creationTime) }}</p>
      <p>用户：{{ comment.username }}</p>
    </div>
 </div>
</template>

<style scoped>

</style>