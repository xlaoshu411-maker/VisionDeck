export { Logger, LogLevel, consoleTransport, remoteTransport } from './logger'
export type { LogEntry, LogTransport, LoggerConfig } from './logger'

import { Logger, LogLevel, consoleTransport } from './logger'

/**
 * 全局共享的 logger 单例
 *
 * 使用方式：
 *   import { logger } from '@infra/logger'
 *   logger.info('App started')
 *
 * 子模块 logger（自动带模块标识）：
 *   const log = logger.child('Dashboard')
 *   log.debug('Fetching data...')
 */

const isDev = import.meta.env.DEV

export const logger = new Logger({
  level: isDev ? LogLevel.DEBUG : LogLevel.WARN,
  transports: [consoleTransport],
})
