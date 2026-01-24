export {}

abstract class ValidationHandler {
  private nextHandler: ValidationHandler | null = null;

  setNextHandler(handler: ValidationHandler): void {
    this.nextHandler = handler;
  }

  protected abstract execValiation(input: string): boolean;
  protected abstract getErrorMessage(): void;

  validate(input: string): boolean {
    const isValid = this.execValiation(input);
    
    if (!isValid) {
      this.getErrorMessage();
      return false;
    }

    if (this.nextHandler) {
      return this.nextHandler.validate(input);
    } else {
      return true;
    }
  }
}

class NonNullValidationHandler extends ValidationHandler {
  protected execValiation(input: string): boolean {
    return input.trim() ? true : false;
  }

  protected getErrorMessage(): void {
    console.error('入力必須です');
  }
}

class AlphabetValidationHandler extends ValidationHandler {
  private regExp: RegExp = /^[A-Za-z0-9 ]+$/;

  protected execValiation(input: string): boolean {
    return this.regExp.test(input.trim());
  }

  protected getErrorMessage(): void {
    console.error('英数字で入力してください');
  }
}

class MinLengthValiationHandler extends ValidationHandler {
  private minLength = 8;

  protected execValiation(input: string): boolean {
    return input.length >= this.minLength;
  }

  protected getErrorMessage(): void {
    console.error(`${this.minLength}文字以上で入力してください`);
  }
}

function main(): void {
  const input1 = '';
  const input2 = 'Hello, World';
  const input3 = 'Good Morning';

  const nonNullValidationHandler = new NonNullValidationHandler();
  const alphabetValidationHandler = new AlphabetValidationHandler();
  const minLenghtValidationHandler = new MinLengthValiationHandler();

  nonNullValidationHandler.setNextHandler(alphabetValidationHandler);
  alphabetValidationHandler.setNextHandler(minLenghtValidationHandler);

  for (const input of [input1, input2, input3]) {
    console.log(`=== input: ${input} ===`);
    const result = nonNullValidationHandler.validate(input);
    console.log(`result: ${result}`);
    console.log();
  }
}

main();