/**
 * MSW Server — Node 端 mock 入口（测试环境用）
 *
 * 在 vitest setup 中启动：
 *   import { server } from '@infra/mock/server'
 *   beforeAll(() => server.listen())
 *   afterEach(() => server.resetHandlers())
 *   afterAll(() => server.close())
 */

import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
