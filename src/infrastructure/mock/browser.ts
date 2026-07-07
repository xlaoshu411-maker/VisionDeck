/**
 * MSW Browser Worker — 浏览器端 mock 入口
 *
 * 在 main.tsx 中条件启动：
 *   if (import.meta.env.DEV) {
 *     const { startMockWorker } = await import('@infra/mock')
 *     await startMockWorker()
 *   }
 */

import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export async function startMockWorker(): Promise<void> {
  await worker.start({
    onUnhandledRequest: 'bypass', // 未 mock 的请求直通真实网络
  })
  console.debug('[MSW] Mock Service Worker started')
}
