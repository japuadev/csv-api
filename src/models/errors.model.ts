export class AppError {
    constructor(
      public message: string,
      public status: number,
    ) {
      this.message = message
      this.status = status
    }
}