import { type ReactNode } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from '@shared/components/ErrorBoundary'
import { router } from '../router'

/**
 * 全局 Provider 组合
 *
 * 集中管理所有 Provider 的嵌套顺序，
 * 避免 main.tsx 中出现 Provider hell。
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary module="AppRoot">
      {children}
    </ErrorBoundary>
  )
}

/** 带路由的完整 Provider */
export function AppWithRouter() {
  return (
    <ErrorBoundary module="AppRoot">
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}
