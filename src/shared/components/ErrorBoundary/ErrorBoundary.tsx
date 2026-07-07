import { Component, type ReactNode, type ErrorInfo } from 'react'
import { logger } from '@infra/logger'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  module?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * 错误边界 — 捕获子组件渲染错误，避免整个应用白屏
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const log = this.props.module ? logger.child(this.props.module) : logger
    log.error('ErrorBoundary caught error', {
      error: error.message,
      componentStack: info.componentStack,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center min-h-[200px] p-8 bg-red-950/20 rounded-lg border border-red-900/50">
            <h3 className="text-red-400 text-lg font-semibold mb-2">组件渲染错误</h3>
            <p className="text-red-300/70 text-sm">
              {this.state.error?.message ?? '未知错误'}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-red-800/50 text-red-200 rounded hover:bg-red-700/50 transition-colors"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              重试
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
