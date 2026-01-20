export {}

class Logger {
  private static instance: Logger | null = null;

  private constructor() {}

  static getInstance(): Logger {
    if (!this.instance) {
      this.instance = new Logger();
    }
    return this.instance;
  }

  output(content: string): void {
    const now = new Date();
    console.log(`${now.toLocaleString('ja-jp')}: ${content}`);
  }
}

function main(): void {
  const logger: Logger = Logger.getInstance();
  logger.output('処理完了');
}

main();