export type AppErrorCode =
  "INVALID_JSON" | "VALIDATION_ERROR" | "INVALID_STATUS_TRANSITION" | "ENV_VALIDATION_ERROR";

export type AppError = {
  code: AppErrorCode;
  message: string;
  details?: unknown;
};

export type Result<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: AppError;
    };

export function ok<T>(data: T): Result<T> {
  return { success: true, data };
}

export function err(code: AppErrorCode, message: string, details?: unknown): Result<never> {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
  };
}
