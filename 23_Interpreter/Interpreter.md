# Interpreter

- 概要
  - 構文を解析し、その結果を利用して処理を行うパターン
- メリット
  - 既存のコードを修正することなく規則の追加・拡張が可能
- デメリット
  - 小さなシステムでは過剰な設計
- 使いどころ
  - 特定の文法で記述された内容を解析して処理したい場合
    - 例. 正規表現、SQL
- オブジェクト指向的要素
  - ポリモーフィズム

## クラス図

### モデル

- `Context`: 解析対象の情報
- `AbstractExpression`: 規則を表す
- `NonTerminalExpression`: 具体的な規則（子要素を持つ中間の規則）
- `TerminalExpression`: 具体的な規則（子要素を持たない末端の規則）
- 内部にCompositeパターンを持つ

``` mermaid
classDiagram
  direction LR

  class Client
  class Context {
    getInfoToInterpret()
  }
  namespace Composite {
    class AbstractExpression {
      <<abstract>>
      interpret()
    }
    class TerminalExpression {
      interpret()
    }
    class NonTerminalExpression {
      childExpressions
      interpret()
    }
  }

  Client --> Context: Association
  Client --> AbstractExpression: Association
  TerminalExpression --|> AbstractExpression: Inheritance
  NonTerminalExpression --|> AbstractExpression: Inheritance
  NonTerminalExpression o--> AbstractExpression: Aggregation
```

### 適用例

- 日付型のフォーマット

``` mermaid
classDiagram

  class Client
  class Context {
    expression: string
    data: Date
    validate()
  }
  class AbstractExpression {
    <<interface>>
    interpret(context)
  }
  class YearExpression {
    -child
    interpret(context)
    setChild(expression)
  }
  class MonthExpression {
    -child
    interpret(context)
    setChild(expression)
  }
  class DayExpression {
    -child
    interpret(context)
    setChild(expression)
  }

  Client --> Context: Association
  Client --> AbstractExpression: Association
  YearExpression ..|> AbstractExpression: Implementation
  YearExpression o--> AbstractExpression: Aggregation
  MonthExpression ..|> AbstractExpression: Implementation
  MonthExpression o--> AbstractExpression: Aggregation
  DayExpression ..|> AbstractExpression: Implementation
  DayExpression o--> AbstractExpression: Aggregation
```