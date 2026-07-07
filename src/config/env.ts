/**
 * 环境变量 — 类型安全的配置入口
 *
 * 所有 import.meta.env.VITE_* 集中在此定义，
 * 业务代码通过 @config/env 引用，不直接访问 import.meta.env。
 */

interface EnvConfig {
  /** API 基础路径，dev 模式被 MSW 拦截 */
  apiBaseUrl: string

  /** 请求超时（毫秒） */
  apiTimeout: number

  /** 应用标题 */
  appTitle: string

  /** 是否为开发环境 */
  isDev: boolean

  /** 是否为生产环境 */
  isProd: boolean
}

function getEnvConfig(): EnvConfig {
  return {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
    apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 15000,
    appTitle: import.meta.env.VITE_APP_TITLE ?? 'VisionDeck · 视觉舱舰',
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
  }
}

export const env = getEnvConfig()
