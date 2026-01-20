# Singleton

- 概要
  - クラスが1つのインスタンスのみを持つことを保証し、このインスタンスへアクセスするためのグローバルな方法を提供するパターン
- 使いどころ
  - プログラム内のクラスで、全てのクライアントが使用できるインスタンスを必ず1つだけに制限したい場合
    - ロギング、キャッシュ管理、コンフィグ、データベース接続ドライバ等
- オブジェクト指向的要素
  - カプセル化

## クラス図

### モデル

``` mermaid
classDiagram
  class Singleton {
    -instance: Singleton
    -Singleton()
    +getInstatance()
  }
```

### 適用例

``` mermaid
classDiagram
  class Logger {
    -instance: Logger
    -Logger()
    +getInstatance()
    +output(content: string)
  }
```