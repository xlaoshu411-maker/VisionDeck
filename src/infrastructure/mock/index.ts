/**
 * MSW 公共入口 — 仅导出浏览器安全的模块
 *
 * 注意：server.ts（msw/node）仅供测试环境使用，
 * 不要在此导出，否则 Vite 会尝试将其打包进浏览器 bundle。
 */

export { startMockWorker, worker } from './browser'
export { handlers } from './handlers'
