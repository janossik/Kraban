export enum collectionName {
  USERS = "users",
}
export enum statusCode {
  OK = 200,
  UNAUTHORIZED = 401,
  Forbidden = 403,
}

export class CustomError extends Error {
  status: number;
  constructor(message?: string | undefined, status?: number) {
    super(message);
    this.status = status || 404;
  }
}
