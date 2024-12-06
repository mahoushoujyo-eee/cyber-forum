import { createRouter, createWebHashHistory } from "vue-router";

import Main from "./components/Main.vue";
import LogIn from "./components/Login.vue";
import Register from "./components/Register.vue"
import LatestBlogsTem from "./components/LatestBlogsTem.vue";
import BlogTem from "./components/BlogTem.vue";
import ForumTem from "./components/ForumTem.vue";

const routes = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Main,
            name: 'main',
            children: [
                {
                    path: '/',
                    component: LatestBlogsTem,
                    name: 'latestBlogsTem',
                    props: true
                },
                {
                    path: '/blog/:id',
                    component: BlogTem,
                    name: 'blog',
                    props: true
                },
                {
                    path: '/forum/:id',
                    component: ForumTem,
                    name: 'forum'
                }
            ]
        },
        {
            path:'/login',
            component: LogIn,
            name: 'login'
        },
        {
            path:'/register',
            component: Register,
            name: 'register'
        },
    ]
})

export default routes;