import { Module } from "vuex";

import type {IRootState} from '../../type'
import { IDashboardState} from "./type";

//发送网络请求
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/analysis/dashboard'



const MainModule:Module<IDashboardState,IRootState> = {
  namespaced:true,
  state(){
    return{
      categoryGoodsCount: [],//不同分类商品个数
      categoryGoodsSale: [],//不同分类商品销量
      categoryGoodsFavor: [],//不同分类商品对应收藏
      addressGoodsSale: []// 不同城市销量
    }
  },
  getters:{

  },
  mutations:{
    // 将数据保存到state里面
    //// 不同分类商品个数
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    //不同分类商品销量
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    // 不同分类商品对应收藏
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    // 不同城市销量
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions:{
    async getDashboardDataAction({commit}){
      //发送网络请求 请求上面的数据
      // 不同分类商品个数
      const categoryCountResult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryCountResult.data)

      // 不同分类商品销量
      const categorySaleResult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categorySaleResult.data)

      // 不同分类商品对应收藏
      const categoryFavorResult = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryFavorResult.data)

      // 不同城市销量
      const addressGoodsResult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsResult.data)
    }
  }
}

export default MainModule
