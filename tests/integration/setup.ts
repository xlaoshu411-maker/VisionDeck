/**
 * 集成测试配置
 *
 * 包含 MSW server，所有 API 调用走 mock。
 */

import '@testing-library/jest-dom/vitest'
import { server } from '@infra/mock/server'

// 在所有测试开始前启动 MSW server
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))

// 每个测试后重置 handlers（避免测试间状态污染）
afterEach(() => server.resetHandlers())

// 所有测试结束后关闭
afterAll(() => server.close())
