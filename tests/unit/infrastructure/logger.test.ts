import { describe, it, expect, vi } from 'vitest'
import { Logger, LogLevel } from '@infra/logger'

describe('Logger', () => {
  it('should create a logger with default config', () => {
    const logger = new Logger()
    expect(logger).toBeDefined()
  })

  it('should respect level filter', () => {
    const transport = vi.fn()
    const logger = new Logger({
      level: LogLevel.WARN,
      transports: [transport],
    })

    logger.debug('ignored')
    logger.info('also ignored')
    logger.warn('logged')

    expect(transport).toHaveBeenCalledTimes(1)
    expect(transport).toHaveBeenCalledWith(
      expect.objectContaining({
        level: LogLevel.WARN,
        message: 'logged',
      }),
    )
  })

  it('child() should create logger with module prefix', () => {
    const transport = vi.fn()
    const parent = new Logger({ level: LogLevel.DEBUG, transports: [transport] })
    const child = parent.child('TestModule')

    child.info('hello')

    expect(transport).toHaveBeenCalledWith(
      expect.objectContaining({
        module: 'TestModule',
        message: 'hello',
      }),
    )
  })
})
