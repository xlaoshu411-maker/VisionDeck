/**
 * 分级日志系统
 *
 * 支持 debug / info / warn / error 四个级别，
 * 开发环境默认 debug 级别以上全部输出，
 * 生产环境可配置为 warn 以上并上报到远程。
 */

export const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  SILENT: 4,
} as const

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel]

export interface LogEntry {
  level: LogLevel
  message: string
  timestamp: number
  module?: string
  data?: unknown
}

export type LogTransport = (entry: LogEntry) => void

export interface LoggerConfig {
  level: LogLevel
  transports: LogTransport[]
}

const LEVEL_LABELS: Record<LogLevel, string> = {
  [LogLevel.DEBUG]: 'DEBUG',
  [LogLevel.INFO]: 'INFO',
  [LogLevel.WARN]: 'WARN',
  [LogLevel.ERROR]: 'ERROR',
  [LogLevel.SILENT]: 'SILENT',
}

function formatTime(ts: number): string {
  return new Date(ts).toISOString()
}

/**
 * 默认控制台 transport — 带彩色输出（仅浏览器）
 */
export function consoleTransport(entry: LogEntry): void {
  const prefix = `[${formatTime(entry.timestamp)}] [${LEVEL_LABELS[entry.level]}]`
  const moduleTag = entry.module ? ` [${entry.module}]` : ''

  const style =
    entry.level >= LogLevel.ERROR
      ? 'color: #ef4444; font-weight: bold'
      : entry.level === LogLevel.WARN
        ? 'color: #f59e0b'
        : entry.level === LogLevel.INFO
          ? 'color: #22d3ee'
          : 'color: #9ca3af'

  if (entry.data !== undefined) {
    console.log(`%c${prefix}${moduleTag} ${entry.message}`, style, entry.data)
  } else {
    console.log(`%c${prefix}${moduleTag} ${entry.message}`, style)
  }
}

/**
 * 远程上报 transport 骨架 — 接入真实日志服务时替换 URL
 */
export function remoteTransport(_apiEndpoint: string): LogTransport {
  return (entry: LogEntry) => {
    // TODO: 接入 Sentry / 自定义日志后端
    // fetch(apiEndpoint, { method: 'POST', body: JSON.stringify(entry) })
    if (entry.level >= LogLevel.WARN) {
      // 仅 warn/error 上报，避免刷爆带宽
      console.debug('[Logger] Remote report stub:', entry.message)
    }
  }
}

export class Logger {
  private config: LoggerConfig

  constructor(config?: Partial<LoggerConfig>) {
    this.config = {
      level: LogLevel.DEBUG,
      transports: [consoleTransport],
      ...config,
    }
  }

  /** 创建带模块标识的子 logger */
  child(module: string): Logger {
    const parent = this
    return {
      ...parent,
      debug: (msg: string, data?: unknown) => parent.debug(msg, data, module),
      info: (msg: string, data?: unknown) => parent.info(msg, data, module),
      warn: (msg: string, data?: unknown) => parent.warn(msg, data, module),
      error: (msg: string, data?: unknown) => parent.error(msg, data, module),
    } as Logger
  }

  private log(level: LogLevel, message: string, data?: unknown, module?: string): void {
    if (level < this.config.level) return

    const entry: LogEntry = {
      level,
      message,
      timestamp: Date.now(),
      module,
      data,
    }

    for (const transport of this.config.transports) {
      try {
        transport(entry)
      } catch {
        // 日志本身不应抛出异常导致业务中断
      }
    }
  }

  debug(message: string, data?: unknown, module?: string): void {
    this.log(LogLevel.DEBUG, message, data, module)
  }

  info(message: string, data?: unknown, module?: string): void {
    this.log(LogLevel.INFO, message, data, module)
  }

  warn(message: string, data?: unknown, module?: string): void {
    this.log(LogLevel.WARN, message, data, module)
  }

  error(message: string, data?: unknown, module?: string): void {
    this.log(LogLevel.ERROR, message, data, module)
  }
}
