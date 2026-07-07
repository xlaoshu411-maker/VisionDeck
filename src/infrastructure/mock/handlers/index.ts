import { dashboardHandlers } from './dashboard'
import { monitoringHandlers } from './monitoring'
import { salesHandlers } from './sales'

export const handlers = [...dashboardHandlers, ...monitoringHandlers, ...salesHandlers]
