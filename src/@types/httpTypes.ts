export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  preconditionFailed = 412,
  serverError = 500,
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<R>;
}

export type HttpRequest = {
  url: string;
  method: "delete" | "get" | "post" | "put";
  body?: any;
  headers?: any;
};

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};
