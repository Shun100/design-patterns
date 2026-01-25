# Bridge

- 概要
  - 機能を提供するクラスと、実装を提供するクラスを独立させるパターン
    - 機能
      - クライアントが理解したい概念・操作の意味
      - 例. ウィンドウを開く、描画する、音量を上げる
    - 実装
      - その意味の実現方法
      - 例. WindowAPIを呼ぶ、X11に描画する、ハードウェアに信号を送る
- メリット
  - 機能の拡張と実装の修正が容易になる
  - プログラムの実行時に実装を切り替えられる
  - 機能や実装のバリエーションが豊富な場合、最終的に必要なクラス数を抑えることができる
- デメリット
  - 小さなシステムでは過剰な設計
- 使いどころ
  - 機能と実装の組み合わせが多い場合
- オブジェクト指向的要素
  - 継承、ポリモーフィズム、委譲

## クラス図

### モデル

- `Abstraction`: 基本機能を提供するクラス
- `RefinedAbstraction`: 追加・拡張機能を提供するクラス
- `Implementor`: 実装を提供するインタフェース
- `ConcreteImplemetor`: 実装を提供するクラス

``` mermaid
classDiagram
  direction LR

  class Abstraction {
    <<abstract>>
    impl: Implementor
    method1()
    method2()
    method3()
  }
  class RefinedAbstraction {
    refinedMethodA()
    refinedMethodB()
  }
  class Implementor {
    <<interface>>
    implMethodX()
    implMethodY()
  }
  class ConcreteImplemetor {
    implMethodX()
    implMethodY()
  }

  Abstraction o--> Implementor: Aggregation
  RefinedAbstraction --|> Abstraction: Inheritance
  ConcreteImplemetor ..|> Implementor: Implementation
```

### 適用例

``` mermaid
classDiagram
  direction LR

  class OS {
    <<abstract>>
    #app: MessageApp
    setApp(app: MessageApp)
    sendMessage()
  }
  class MessageApp {
    <<interface>>
    send()
  }
  class IOS {
    sendMessage()
  }
  class Android {
    sendMessage()
  }
  class LINE {
    send()
  }
  class Twitter {
    send()
  }
  class Facebook {
    send()
  }

  OS o--> MessageApp: Aggregation
  IOS --|> OS: Inheritance
  Android --|> OS: Inheritance
  LINE ..|> MessageApp: Implementation
  Twitter ..|> MessageApp: Implementation
  Facebook ..|> MessageApp: Implementation
```