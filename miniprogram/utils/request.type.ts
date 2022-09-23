export interface BaseRequestRes<D extends Record<string, unknown>> {
  data: D

  status: number
  code: number
}
