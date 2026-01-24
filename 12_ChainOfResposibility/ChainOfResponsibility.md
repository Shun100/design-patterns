# Chain of Responsibility

- 概要
  - クライアントからのリクエストを処理するオブジェクトを鎖のように繋げ、処理が可能なオブジェクトにリクエストを順に渡すパターン
    - リクエストが渡されたオブジェクト（ハンドラ）は自身で処理する必要があるかどうかを判断し、自分で対処できない場合は次のハンドラに渡す
- メリット
  - リクエスト処理の順序を制御できる
  - リクエストの送信側と受信側の結びつきを弱くできる
  - 新しい処理クラスを容易に追加できる（オープンクローズドの原則）
- デメリット
  - 処理がたらいまわしにされるのでパフォーマンスに影響が出る可能性がある
- 使いどころ
  - 特手の順序で複数の処理を実行する必要がある場合
    - フォームの入力値バリデーション
  - ハンドラの組み合わせと順序を実行時に変更したい場合
    - setterで次のハンドラをセットすることで、実行時に処理を決定できる
- オブジェクト指向的要素
  - ポリモーフィズム

## クラス図

### モデル

``` mermaid
classDiagram
  direction LR

  class Client
  class Handler {
    <<abstract>>
    next: Handler
    handle()
  }
  class ConcreteHandler1 {
    handle()
  }
  class ConcreteHandler2 {
    handle()
  }

  Client --> Handler: Associtaion (Request)
  ConcreteHandler1 --|> Handler: Inheritance
  ConcreteHandler2 --|> Handler: Inheritance
```

### 適用例

- 入力された文字のバリデーション

``` mermaid
classDiagram
  direction LR

  class Client
  class ValidationHandler {
    <<abstract>>
    -nextHandler: ValidationHandler
    setHandler(handler: ValidationHandler)
    validate(input: string)
    #execValidation(input: string)
    #getErrorMessage()
  }
  class NotNullValidationHandler {
    #execValidation(input: string)
    #getErrorMessage()
  }
  class AlphabetValidationHandler {
    #execValidation(input: string)
    #getErrorMessage()
  }
  class MinLengthValidationHandler {
    #execValidation(input: string)
    #getErrorMessage()
  }

  Client --> ValidationHandler: Associtaion (Request)
  NotNullValidationHandler --|> ValidationHandler: Inheritance
  AlphabetValidationHandler --|> ValidationHandler: Inheritance
  MinLengthValidationHandler --|> ValidationHandler: Inheritance
```