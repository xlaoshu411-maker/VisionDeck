/**
 * 应用路由配置
 *
 * 使用 React Router v7 的嵌套路由。
 * 新增页面：在 modules/<name>/pages/ 下创建页面组件，在此注册路由。
 */

import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { DashboardPage } from '@modules/dashboard/pages/DashboardPage'

// ---- 路由定义 ----

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
