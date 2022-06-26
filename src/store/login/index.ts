import { Module } from "vuex";
import type {ILoginState} from './type'
import type {IRootState} from '../type'
import { accountLoginRequest, requestUserInfoById, requestUserMenusfoById } from "@/service/login";
import { IAccount } from "@/service/login/type";
import localCache from '@/utils/cache'
import router from "@/router";
import { mapMenusToPermission, mapMenusToRoutes } from "@/utils/mapMenusToRoutes";

const LoginModule:Module<ILoginState,IRootState> = {
  namespaced:true,
  state(){
    return{
      token:'',
      userInfo:{},
      userMenus:[],
      permissions:[]
    }
  },
  getters:{

  },
  mutations:{
    changeToken(state,token:string){
      state.token = token
    },
    changeUserInfo(state,userInfo){
      state.userInfo = userInfo
    },
    changeUserMenus(state,userMenus){
      state.userMenus = userMenus
      //动态路由相关操作
      //1.根据userMenus筛选出来所需要的路由对象放入一个routes数组中
      const routes = mapMenusToRoutes(userMenus)
      //2.将routes放入router.main.children中。（router.addRouter）
      routes.forEach(route=>{
        router.addRoute('main',route)
      })
      // 获取用户按钮的权限
      const permissions = mapMenusToPermission(userMenus)
      console.log(1,permissions)
      state.permissions = permissions
    }
  },
  actions:{
    async accountLoginAction({commit,dispatch},payload:IAccount){

      //1.发送请求获取token
      const loginRes = await accountLoginRequest(payload)
      // console.log('执行登录action',loginRes)
      const {id,token} = loginRes.data
      commit('changeToken',token)
      localCache.setCache('token',token)

      //发送初始化的请求（完整的role/department）
      dispatch('getInitialDataAction',null,{root:true})//调用root的action

      //2.请求用户信息
      const userInfoRes = await requestUserInfoById(id)
      const userInfo = userInfoRes.data
      // console.log("userInfo",userInfo)
      commit('changeUserInfo',userInfo)
      localCache.setCache('userInfo',userInfo)

      //3.获取userMenus
      const userMenusRes = await requestUserMenusfoById(id)
      const userMenus = userMenusRes.data
      // console.log('userMenus',userMenus)
      commit('changeUserMenus',userMenus)
      localCache.setCache('userMenus',userMenus)

      //3.路由跳转到首页
      router.push('/main')
    },
    loadLocalLogin({commit,dispatch}){
      //将本地存储中的数据存到vuex中。防止刷新vuex中数据丢失
      const token = localCache.getCache('token')
      if(token){
        commit('changeToken',token)
        //发送初始化的请求（完整的role/department）
        dispatch('getInitialDataAction',null,{root:true})//调用root的action
      }
      const userInfo = localCache.getCache('userInfo')
      if(userInfo){
        commit('changeUserInfo',userInfo)
      }

      const userMenus = localCache.getCache('userMenus')
      if(userMenus){
        commit('changeUserMenus',userMenus)
      }
      // console.log(token,userInfo,userMenus)
    }
  }
}

export default LoginModule
