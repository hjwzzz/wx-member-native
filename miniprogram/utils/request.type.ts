export interface BaseRequestRes<D> {
  data: D;
  status: number;
  code: number;
  msg: string;
}
