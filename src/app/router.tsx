import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { DashboardPage } from '@modules/dashboard/pages'
import { MonitoringPage } from '@modules/monitoring/pages'
import { SalesPage } from '@modules/sales/pages'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'monitoring', element: <MonitoringPage /> },
      { path: 'sales', element: <SalesPage /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
