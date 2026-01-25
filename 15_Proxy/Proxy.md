# Proxy

- 概要
  - 代理となるオブジェクトを通じて、間接的に目的のオブジェクトにアクセスさせるためのパターン
    - 目的のオブジェクトへのアクセスを制御し、目的のオブジェクトへリクエストが届く前後に別の処理を行うことができるようになる
- メリット
  - オブジェクトへのアクセスが間接的になる
  - 目的のオブジェクトがまだ存在しない場合でも開発が進められる
  - 容易に新規プロキシを追加できる（オープンクローズドの原則）
- デメリット
  - 小さなシステムでは過剰な設計
- 使いどころ
  - リクエストの前後に処理を追加したい場合
    - ロギング、キャッシュ
  - 目的のオブジェクトに対してアクセス制御を行いたい
- オブジェクト指向的要素
  - ポリモーフィズム、委譲

## クラス図

### モデル

``` mermaid
classDiagram
  direction LR

  class Client
  class Subject {
    <<interface>>
    request1()
    request2()
  }
  class Proxy {
    realSubject
    request1()
    request2()
  }
  class RealSubject {
    request1()
    request2()
  }

  Client --> Subject: Association
  Proxy ..|> Subject: Implementation
  Proxy o--> RealSubject: Aggregation
  RealSubject ..|> Subject: Implementation
```

### 適用例

``` mermaid
classDiagram
  direction LR

  class Client
  class Server {
    <<interface>>
    handle(userId: string)
  }
  class Proxy {
    -server: Server
    -authorize(userId: string)
    handle(userId: string)
  }
  class RealServer {
    handle(userId: string)
  }

  Client --> Server: Association
  Proxy ..|> Server: Implementation
  Proxy o--> RealServer: Aggregation
  RealServer ..|> Server: Implementation
```