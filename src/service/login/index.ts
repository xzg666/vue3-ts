import hyRequest from '../index'
import { IAccount } from './type'
import type { ILoginResult, IDateType } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', //用法：/user/1
  UserMenus = '/role/' //用法：role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDateType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return hyRequest.get<IDateType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusfoById(id: number) {
  return hyRequest.get<IDateType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
