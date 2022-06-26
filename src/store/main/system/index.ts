import { createPageData, deletePageData, editPageData, getPageListData } from "@/service/main/system/system";
import { Module } from "vuex";

import type {IRootState} from '../../type'
import { ISystemState } from "./type";

const MainModule:Module<ISystemState,IRootState> = {
  namespaced:true,
  state(){
    return{
      usersList:[],
      usersCount:0,
      roleList:[],
      roleCount:0,
      goodsList:[],
      goodsCount:0,
      menuList:[],
      menuCount:0
    }
  },
  getters:{
    pageListData(state){
      return (pageName:string)=>{
        return state[`${pageName}List`]
      }
    },
    pageListCount(state){
      return (pageName:string)=>{
        return state[`${pageName}Count`]
      }
    }
  },
  mutations:{
    changeUsersList(state,list){
      state.usersList = list
    },
    changeUsersCount(state,count){
      state.usersCount = count
    },
    changeRoleList(state,list){
      state.roleList = list
    },
    changeRoleCount(state,count){
      state.roleCount = count
    },
    changeGoodsList(state,list){
      state.goodsList = list
    },
    changeGoodsCount(state,count){
      state.goodsCount = count
    },
    changeMenuList(state,list){
      state.menuList = list
    },
    changeMenuCount(state,count){
      state.menuCount = count
    },
  },
  actions:{
    async getPageListAction({commit},payload:any){
      // console.log(payload.pageName,payload.queryInfo)
      //1.获取pageUrl
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      //2.发送请求
      const pageRes = await getPageListData(pageUrl,payload.queryInfo)

      //3.将数据存到store中
      const {list,totalCount} = pageRes.data
      //将pageName首字母大写
      const newPageName = pageName.slice(0,1).toUpperCase()+pageName.slice(1)
      commit(`change${newPageName}List`,list)
      commit(`change${newPageName}Count`,totalCount)
    },
    //删除事件
    async deletePageDataAction(context,payload:any){
        const {pageName,id} = payload
        const pageUrl = `/${pageName}/${id}`
        await deletePageData(pageUrl)
        //重新请求
        context.dispatch('getPageListAction',{
          pageName,
          queryInfo:{
            offset:0,
            size:10
          }
        })
    },

    //新建action
    async createPageDataAction({dispatch},payload:any){
      //1.创建数据的请求
      const {pageName,newData} = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl,newData)

      //2.请求最新的数据
      dispatch('getPageListAction',{
        pageName,
        queryInfo:{
          offset:0,
          size:10
        }
      })
    },

    //编辑
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default MainModule
