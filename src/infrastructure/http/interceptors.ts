/**
 * Axios 拦截器 — 日志记录 & 统一错误处理
 */

import { type AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { logger } from '@infra/logger'

/** 请求拦截：记录每个发出的请求 */
export function requestLogger(
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
  logger.debug(`→ ${config.method?.toUpperCase()} ${config.baseURL ?? ''}${config.url}`, {
    params: config.params,
  })
  return config
}

/** 响应拦截：记录响应 */
export function responseLogger(response: AxiosResponse): AxiosResponse {
  logger.debug(`← ${response.status} ${response.config.url}`)
  return response
}

/**
 * 统一错误处理 — 将 axios 错误转为业务可消费的格式
 */
export function errorHandler(error: AxiosError): Promise<never> {
  if (error.response) {
    // 服务端返回了错误状态码
    logger.error(
      `API Error ${error.response.status}: ${error.config?.url}`,
      error.response.data,
    )
  } else if (error.request) {
    // 请求发出但没有收到响应（网络错误/超时）
    logger.error(`Network Error: ${error.config?.url}`, {
      message: error.message,
    })
  } else {
    // 请求配置阶段出错
    logger.error('Request Config Error', error.message)
  }

  return Promise.reject(error)
}
