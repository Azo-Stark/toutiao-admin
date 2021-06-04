import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LayOut',
    component: () => import('../views/layout'),
    meta: {
      isAuthenticated: true
    },
    children: [
      {
        path: '/',
        component: () => import('../views/home'),
        name: 'Home'
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('../views/article')
      },
      {
        path: '/image',
        name: 'Image',
        component: () => import('../views/image')
      },
      {
        path: '/publish',
        name: 'Publish',
        component: () => import('../views/publish')
      },
      {
        path: '/comment',
        name: 'Comment',
        component: () => import('../views/comment')
      },
      {
        path: '/fans',
        name: 'Fans',
        component: () => import('../views/fans')
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/settings')
      }
    ]
  },
  {
    path: '/login',
    nam: 'Login',
    component: () => import('../views/login')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login，校验登录状态
  // 如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  // 允许通过
  // next()
  NProgress.start()
  const user = JSON.parse(window.localStorage.getItem('userInfo'))

  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录，允许通过
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})

router.afterEach((to, from) => {
  // 结束顶部的导航进度条
  NProgress.done()
})

export default router
