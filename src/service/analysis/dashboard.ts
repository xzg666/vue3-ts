import hyRequest from '../../service/index'
import { IDateType } from '../login/type'

//有多个网络请求将他放入枚举里面
enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}
// 发送对应的网络请求
// 不同分类商品个数
export function getCategoryGoodsCount() {
  return hyRequest.get<IDateType>({
    url: DashboardAPI.categoryGoodsCount
  })
}
//不同分类商品销量
export function getCategoryGoodsSale() {
  return hyRequest.get<IDateType>({
    url: DashboardAPI.categoryGoodsSale
  })
}

//不同分类商品对应收藏
export function getCategoryGoodsFavor() {
  return hyRequest.get<IDateType>({
    url: DashboardAPI.categoryGoodsFavor
  })
}

// 不同城市销量
export function getAddressGoodsSale() {
  return hyRequest.get<IDateType>({
    url: DashboardAPI.addressGoodsSale
  })
}
