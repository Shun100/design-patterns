# Command

- 概要
  - 命令をメソッドではなく、独立したクラスで表現するパターン
- メリット
  - 既存のコードを修正することなく命令の追加・拡張が可能
  - 命令の再利用性が可能
  - 命令をキューに詰めれてキューイングが可能
- デメリット
  - 小さなシステムでは過剰な設計となる
- 使いどころ
  - 複数の命令をひとまとめに実行したい場合
  - 命令をキューに入れて遅延実行したい場合
    - Commandパターンは命令と実際の実行を別のタイミングで実施可能
  - UndoやRedoを実現したい場合
- オブジェクト指向的要素
  - ポリモーフィズム

## クラス図

### モデル

- `Command`: 命令を表すインタフェース
- `ConcreteCommand`: 命令を実装した子クラス
- `Invoker`: 命令の送り手となるクラス 内部に命令オブジェクトを保持し、命令の実行タイミングを制御する
- `Receiver`: 命令の受け取り手

``` mermaid
classDiagram
  direction LR

  class Client
  class Command {
    <<interface>>
    execute()
  }
  class ConcreteCommand {
    receiver: Receiver
    execute()
  }
  class Invoker {
    command: Command
    excuteCommand()
  }
  class Receiver {
    action()
  }

  Invoker o--> Command: Aggregation
  ConcreteCommand ..|> Command: Implementation
  ConcreteCommand o--> Receiver: Aggregation
  Client --> ConcreteCommand: Association
```

### 適用例

- ファイル操作をキューに入れてまとめて実行する

``` mermaid
classDiagram
  
  class Queue {
    -commands: Command[]
    executeCommand()
  }
  class Command {
    <<interface>>
    execute()
  }
  class OpenCommand {
    -file: File
    execute()
  }
  class CompressCommand {
    -file: File
    execute()
  }
  class CloseCommand {
    -file: File
    execute()
  }
  class File {
    open()
    compress()
    close()
  }

  Queue o--> Command: Aggregation
  OpenCommand ..|> Command: Implementation
  OpenCommand o--> File: Aggregation
  CompressCommand ..|> Command: Implementation
  CompressCommand o--> File: Aggregation
  CloseCommand ..|> Command: Implementation
  CloseCommand o--> File: Aggregation
```