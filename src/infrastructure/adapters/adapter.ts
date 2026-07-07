/**
 * 数据适配器层
 *
 * 职责：将 API 响应数据转换为 UI 层消费的格式。
 * API → Adapter → UI Model
 *
 * mock ↔ 真实 API 切换时，只需替换 adapter 的数据来源，
 * UI 层代码不受影响。
 */

/**
 * 通用 API 响应包裹类型
 */
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

/**
 * 适配器函数类型：原始数据 → 视图模型
 */
export type AdapterFn<TRaw, TModel> = (raw: TRaw) => TModel

/**
 * 创建适配器管道
 *
 * 用法：
 *   const adapter = createAdapter<ApiRaw, ViewModel>(raw => ({ ... }))
 *   const viewData = adapter(rawApiData)
 */
export function createAdapter<TRaw, TModel>(fn: AdapterFn<TRaw, TModel>) {
  return fn
}

/**
 * 从 ApiResponse 中提取 data 并适配
 * 处理 code !== 0 的情况
 */
export function adaptResponse<TRaw, TModel>(
  response: ApiResponse<TRaw>,
  adapter: AdapterFn<TRaw, TModel>,
): { ok: true; data: TModel } | { ok: false; error: string } {
  if (response.code !== 0) {
    return { ok: false, error: response.message || 'Unknown error' }
  }
  return { ok: true, data: adapter(response.data) }
}
