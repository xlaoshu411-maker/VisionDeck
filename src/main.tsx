/**
 * 应用入口
 *
 * 启动顺序：
 * 1. 开发环境 → 启动 MSW Mock Service Worker
 * 2. 渲染 React 应用
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppWithRouter } from '@app/providers/AppProviders'
import { logger } from '@infra/logger'
import './index.css'

async function bootstrap(): Promise<void> {
  logger.info('VisionDeck bootstrapping...', {
    mode: import.meta.env.MODE,
    dev: import.meta.env.DEV,
  })

  // 开发环境启动 MSW
  if (import.meta.env.DEV) {
    const { startMockWorker } = await import('@infra/mock')
    try {
      await startMockWorker()
      console.log('✅ [MSW] Mock Service Worker 已启动 — API 请求将被拦截')
      logger.info('MSW started successfully')
    } catch (err) {
      console.error('❌ [MSW] Mock Service Worker 启动失败 — 请检查 public/mockServiceWorker.js', err)
      logger.warn('MSW start failed — falling back to real API', err)
    }
  }

  const root = document.getElementById('root')
  if (!root) {
    throw new Error('Root element #root not found')
  }

  createRoot(root).render(
    <StrictMode>
      <AppWithRouter />
    </StrictMode>,
  )

  logger.info('VisionDeck ready 🚀')
}

bootstrap().catch(err => {
  console.error('Bootstrap failed:', err)
})
