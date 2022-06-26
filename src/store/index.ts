import { createStore } from "vuex";
import type {IRootState} from './type'

import login from "./login";
import system from "./main/system";

import {getPageListData} from '@/service/main/system/system'

const store =  createStore<IRootState>({
  state: {
    name:'',
    entireDepartment:[],
    entireRole:[],
    entireMenu:[]
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state,list){
      state.entireDepartment = list
    },
    changeEntireRole(state,list){
      state.entireRole = list
    },
    changeEntireMenu(state,list){
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({commit}){
      //1.请求部门和角色数据
      const departmentRes = await getPageListData('/department/list',{
        offset:0,
        size:10000
      })
      const {list:departmentList} = departmentRes.data
      const roleRes = await getPageListData('/role/list',{
        offset:0,
        size:10000
      })
      const {list:roleList} = roleRes.data
      const menuRes = await getPageListData('/menu/list',{})
      const {list:menuList} = menuRes.data
      //2.保存数据
      commit('changeEntireDepartment',departmentList)
      commit('changeEntireRole',roleList)
      commit('changeEntireMenu',menuList)
    }
  },
  modules: {
    login,
    system
  },
});

export function setupStore(){
  store.dispatch('login/loadLocalLogin')
}

export default store


