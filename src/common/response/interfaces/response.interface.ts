export interface IResponse<T = Record<string, any>> {
  date: Date;
  path: string;
  status: number;
  message: string;
  data: T;
}

export interface IExceptionResponse {
  date: Date;
  path: string;
  statusCode: number;
  message: string | object;
}
