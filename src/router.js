import { createRouter, createWebHistory } from 'vue-router'
import BlogFeed from './components/Blog.vue'
import CreatePost from './components/CreatePost.vue'
import PostDetail from './components/PostDetail.vue'    

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BlogFeed
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost
    },
    {
       path: '/post/:id', 
       name: 'post', 
       component: PostDetail 
    }
  ]
})

export default router