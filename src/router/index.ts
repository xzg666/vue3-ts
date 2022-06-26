import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import localcache from '@/utils/cache'
import {firstMenu} from '@/utils/mapMenusToRoutes'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect:'/login'
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/login/login.vue"),
  }, {
    path: "/main",
    name: "main",
    component: () =>
      import("../views/main/main.vue"),
  },{
    path:'/:pathMatch(.*)',
    component:()=> import('@/views/not-fund/not-fund.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  //如果没去login页面，也没有拿到token，则一律回到login
  if(to.path !== '/login'){
    const token = localcache.getCache('token')
    if(!token){
      return '/login'
    }
  }

  //第一次进入main的重定向
  if(to.path === '/main'){
    return firstMenu.url
  }

})

export default router;
