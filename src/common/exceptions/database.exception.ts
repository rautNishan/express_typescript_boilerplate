export class DatabaseException {
  public message: object | string;
  constructor(message: object | string) {
    this.message = message;
  }
}
