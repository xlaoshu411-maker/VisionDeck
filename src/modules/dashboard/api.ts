/**
 * Dashboard API 层
 *
 * 所有接口调用集中于此。
 * mock 环境 → MSW 拦截 /api/dashboard/*
 * 生产环境 → 真实后端接口
 * UI 层不感知差异。
 */

import { request } from '@infra/http'
import type { ApiResponse } from '@infra/adapters'
import type { DashboardData, StatItem } from './types'

const MODULE = 'DashboardAPI'

/** 获取 Dashboard 概览数据 */
export async function fetchDashboardOverview(): Promise<ApiResponse<DashboardData>> {
  const res = await request<ApiResponse<DashboardData>>(
    { method: 'GET', url: '/dashboard/overview' },
    MODULE,
  )
  return res.data
}

/** 获取指标卡片数据 */
export async function fetchDashboardStats(): Promise<ApiResponse<StatItem[]>> {
  const res = await request<ApiResponse<StatItem[]>>(
    { method: 'GET', url: '/dashboard/stats' },
    MODULE,
  )
  return res.data
}
