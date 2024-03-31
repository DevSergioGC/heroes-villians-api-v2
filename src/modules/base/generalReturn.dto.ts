export class GeneralResponseDto<dataType> {
  success: boolean;
  statusCode?: number;
  data?: dataType;
  error?: ErrorDto;

  constructor(
    success: boolean,
    statusCode?: number,
    data?: dataType,
    error?: ErrorDto,
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.data = data;
    this.error = error;
  }
}

export class ErrorDto {
  message: string;
  error: string;
}
