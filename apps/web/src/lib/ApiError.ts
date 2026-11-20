export class ApiError extends Error {
  public statusCode?: number;
  public errors?: { field: string; message: string }[];
  constructor(
    message: string,
    statusCode?: number,
    errors?: { field: string; message: string }[],
  ) {
    super(message);
    this.name = "ApiError";
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (errors) {
      this.errors = errors;
    }
  }
}
