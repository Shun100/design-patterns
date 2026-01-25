# Decorator

- 概要
  - 基本となるオブジェクトに対して柔軟に機能を追加するパターン
    - 継承による機能追加よりも動的に機能追加が可能
- メリット
  - 実行時の機能追加が容易
  - 複数の機能を組み合わせることが可能
- デメリット
  - 追加した機能から特定の機能を削除することは困難
  - 振る舞いはデコレータの組み合わせの順序に依存する
- 使いどころ
  - 追加したい機能のパターンが複数ある場合
  - 追加したい機能のパターンに順序性がある場合
  - 継承を使ってオブジェクトの機能拡張が困難な場合
    - 例. (TypeScriptには無いが)final修飾子が追加クラス
- オブジェクト指向的要素
  - 継承、ポリモーフィズム

## クラス図

### モデル

- `Component`: 拡張される基本機能のAPI定義
- `ConcreteComponent`: 基本機能の実装
- `Decorator`: 拡張機能のAPI定義
- `ConcreteDecorator`: 拡張機能の実装

``` mermaid
classDiagram
  direction LR

  class Component {
    <<interface>>
    method1()
    method2()
  }
  class ConcreteComponent {
    method1()
    method2()
  }
  class Decorator {
    <<abstract>>
    component: Component
    method1()
    method2()
  }
  class ConcreteDecorator {
    method1()
    method2()
  }

  ConcreteComponent ..|> Component: Implementation
  Decorator ..|> Component: Implementation
  Decorator o--> Component: Aggregation
  ConcreteDecorator --|> Decorator: Inheritance
```

### 適用例

- ログ拡張

``` mermaid
classDiagram
  direction LR

  class Logger {
    getLogMessage(msg: string) string
  }
  class Component {
    <<interface>>
    getLogMessage(msg: string) string
  }
  class Decorator {
    <<abstract>>
    #component: Compoenent
    getLogMessage(msg: string) string
  }
  class TimestampDecorator {
    getLogMessage(msg: string) string
  }
  class LogLevelDecorator {
    -logLevel: string
    getLogMessage(msg: string) string
  }

  Logger ..|> Component: Implementation
  Decorator ..|> Component: Implementation
  Decorator o--> Component: Aggregation
  TimestampDecorator --|> Decorator: Inheritance
  LogLevelDecorator --|> Decorator: Inheritance
```