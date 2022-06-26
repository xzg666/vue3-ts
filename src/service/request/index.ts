import axios from 'axios'

import type { AxiosInstance } from 'axios'
import type { HyRequestInterceptors, HyRequestConfig } from './type'
// import  ILoadingInstance  from 'element-plus/lib/components/loading'

import { ElLoading } from 'element-plus'

class HyRequest {
  instance: AxiosInstance
  interceptors?: HyRequestInterceptors
  loading?: any
  showLoading?: boolean

  constructor(config: HyRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true //没传默认true

    //请求拦截:将传进来的参数进行使用
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    //响应拦截:将传进来的参数进行使用
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //添加所以实例都有的拦截器、拦截都会依次执行，位置决定先后顺序
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所以实例都有的拦截器：请求成功拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '请求数据中...',
            background: 'rgba(0,0,0,0.5)'
          })
        }

        return config
      },
      (err) => {
        // console.log('所以实例都有的拦截器：请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所以实例都有的拦截器：响应成功拦截')
        const data = res.data
        if (data?.returnCode === '-1001') {
          console.log('请求失败~，错误信息')
        }
        this.loading?.close()
        return data
      },
      (err) => {
        // console.log('所以实例都有的拦截器：响应失败拦截')
        //例子：判断不同的httpErrorcode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404错误~')
        }
        this.loading?.close()
        return err
      }
    )
  }

  request<T>(config: HyRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config) //拿到请求的参数拦截函数，进行调用拦截
      }

      if (config.showLoading === false) {
        this.showLoading = false
      }

      //调用axios实例的request方法
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res) //拿到请求的参数拦截函数，进行响应拦截
          }
          this.showLoading = true
          resolve(res)
        })
        .catch((err) => {
          //将showloading设置true，这样就不会影响下一个请求
          this.showLoading = true
          reject(err)
          return err
        })
    })
  }

  get<T>(config: HyRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HyRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HyRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: HyRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HyRequest
