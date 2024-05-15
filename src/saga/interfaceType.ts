export interface responseInterface {
  data: object;
  success: object;
  error: {
    code: any;
    message: string;
  };
  statusCode: number;
  message: string;
}
