export {}

// 基本機能のAPI
interface Component {
  getLogMessage(msg: string): string;
}

// 基本機能
class Logger implements Component {
  getLogMessage(msg: string): string {
    return msg;
  }
}

// 拡張機能のAPI
abstract class Decorator implements Component {
  constructor(protected component: Component) {}

  abstract getLogMessage(msg: string): string;
}

// 拡張機能
class TimestampDecorator extends Decorator {
  getLogMessage(msg: string): string {
    const date = new Date();
    const timestamp = date.toLocaleString('ja-JP');
    return this.component.getLogMessage(`${timestamp} ${msg}`); // 処理は基本機能クラスに委譲し、引数として拡張機能の差分を与える
  }
}

class LogLevelDecorator extends Decorator {
  constructor(protected component: Component, private logLevel: string) {
    super(component);
  }

  getLogMessage(msg: string): string {
    return this.component.getLogMessage(`${this.logLevel} ${msg}`); // 処理は基本機能クラスに委譲し、引数として拡張機能の差分を与える
  }
}

function main() {
  // 呼び出す際に動的に機能の組み合わせ、順序を変えられる
  const logger = new Logger();
  const logLevelLogger = new LogLevelDecorator(logger, 'INFO');
  const timestampLogger = new TimestampDecorator(logLevelLogger);

  const logMessage = timestampLogger.getLogMessage('Hello, Decorator pattern');
  console.log(logMessage);
}

main();
