export enum ErrorCode {
  Unauthorized = 401, // 未登录
  Forbidden = 403, // 禁止访问
  NotFound = 404, // 资源未找到
  InternalServerError = 500, // 服务器内部错误
}
