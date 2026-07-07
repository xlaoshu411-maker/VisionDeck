/**
 * 所有 MSW handler 集中注册
 * 新增模块时在此导入对应 handlers
 */

import { dashboardHandlers } from './dashboard'

export const handlers = [...dashboardHandlers]
