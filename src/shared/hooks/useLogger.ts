import { useRef } from 'react'
import { logger, type Logger } from '@infra/logger'

/**
 * 获取模块级 logger hook
 *
 * 用法：
 *   const log = useLogger('Dashboard')
 *   log.info('Component mounted')
 */
export function useLogger(module: string): Logger {
  const loggerRef = useRef<Logger | null>(null)
  if (!loggerRef.current) {
    loggerRef.current = logger.child(module)
  }
  return loggerRef.current
}
