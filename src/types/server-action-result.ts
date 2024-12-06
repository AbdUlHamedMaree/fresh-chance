export type ServerActionResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };
export type ServerActionResultData<T extends ServerActionResult<unknown>> = T extends { success: true }
  ? T['data']
  : never;
