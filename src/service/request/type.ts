import type { AxiosRequestConfig } from 'axios' //axios的类型

export interface HyRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig //请求拦截第一个函数对参数进行处理
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: any) => any //响应拦截第一个函数对结果进行处理
  responseInterceptorCatch?: (error: any) => any
}

//定义constructor函数的config类型
export interface HyRequestConfig extends AxiosRequestConfig {
  interceptors?: HyRequestInterceptors
  showLoading?: boolean
}
