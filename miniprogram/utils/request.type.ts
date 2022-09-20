export interface BaseRequestRes<D extends Record<string, unknown>> {
  data: {
    appId: string
    appType: string
    epid: string
    data: D
  }
  status: number
  code: number
}
