class Exception extends Error {
  constructor(readonly message: string, readonly code: number) {
    super(message);
    Object.setPrototypeOf(this, Exception.prototype);
  }

  public getMessage(): string {
    return this.message;
  }

  public getCode(): number {
    return this.code;
  }
}

export default Exception;
