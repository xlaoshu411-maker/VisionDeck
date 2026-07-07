/**
 * HTTP 客户端 — 基于 axios 封装
 *
 * 特性：
 * - 请求/响应拦截器（日志 + 错误处理）
 * - 环境自适应（dev → MSW mock，prod → 真实 API）
 * - 类型安全的请求/响应
 */

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { logger } from '@infra/logger'
import { requestLogger, responseLogger, errorHandler } from './interceptors'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 15000

function createHttpClient(): AxiosInstance {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // 请求拦截器 — 日志 + 注入 token 等
  client.interceptors.request.use(requestLogger, errorHandler)

  // 响应拦截器 — 日志 + 统一错误格式
  client.interceptors.response.use(responseLogger, errorHandler)

  return client
}

export const http: AxiosInstance = createHttpClient()

/**
 * 带日志标签的请求包装器
 * 每个模块调用时传入 module 名称，自动在日志中标记来源
 */
export async function request<T = unknown>(
  config: AxiosRequestConfig,
  module?: string,
): Promise<AxiosResponse<T>> {
  const log = module ? logger.child(module) : logger
  log.debug(`HTTP ${config.method?.toUpperCase() ?? 'GET'} ${config.url}`)
  return http.request<T>(config)
}
