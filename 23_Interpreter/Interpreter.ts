export {}

// 解析の対象
class Context {
  constructor(public expression: string, public date: Date) {
    this.validate(this.expression);
    this.expression = expression;
  }

  validate(expression: string): void {
    const regExp: RegExp = /^(?=.*YYYY)(?=.*MM)(?=.*DD)/;
    if (expression.length === 10 && regExp.test(expression)) {
      console.log('OK');
    } else {
      throw new Error('Expressionが不正です');
    }
  }
}

// 解析の規則
interface AbstractExpression {
  interpret(context: Context): void;
}

class YearExpression implements AbstractExpression {
  private child: AbstractExpression | null = null;

  setChild(child: AbstractExpression): void {
    this.child = child;
  }

  interpret(context: Context): Context {
    const expression = context.expression;
    const year = context.date.getFullYear();
    context.expression = expression.replace('YYYY', year.toString());

    if (this.child) {
      this.child.interpret(context);  // 解析の対象を渡す
    }

    return context;
  }
}

class MonthExpression implements AbstractExpression {
  private child: AbstractExpression | null = null;

  setChild(child: AbstractExpression): void {
    this.child = child;
  }

  interpret(context: Context): Context {
    const expression = context.expression;
    const month = context.date.getMonth() + 1;
    context.expression = expression.replace('MM', month.toString());

    if (this.child) {
      this.child.interpret(context);  // 解析の対象を渡す
    }

    return context;
  }
}

class DayExpression implements AbstractExpression {
  private child: AbstractExpression | null = null;

  setChild(child: AbstractExpression): void {
    this.child = child;
  }

  interpret(context: Context): Context {
    const expression = context.expression;
    const day = context.date.getDate();
    context.expression = expression.replace('DD', day.toString());

    if (this.child) {
      this.child.interpret(context);  // 解析の対象を渡す
    }

    return context;
  }
}

function main(): void {
  const now = new Date();
  console.log(now);

  const expression = 'MM/DD/YYYY';
  const context = new Context(expression, now);
  const yearExpression = new YearExpression();
  const monthExpression = new MonthExpression();
  const dayExpression = new DayExpression();

  monthExpression.setChild(dayExpression);
  yearExpression.setChild(monthExpression);

  const result = yearExpression.interpret(context);
  console.log(result.expression);
}

main();
