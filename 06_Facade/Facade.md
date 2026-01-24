# Facade

- 概要
  - Facadeは(フランス語で「建物の正面」の意味)
  - 複雑な内部処理をまとめ、システムの外部に簡素化されたインタフェースを提供するパターン
  - システムの内側にある各クラスの役割や依存関係を考えて、正しい順番でクラスを利用できるようにする
- メリット
  - 複雑なクラス群を外部から隠蔽できる
  - 内部とクライアントの結びつきが弱くなり、内部の修正がクライアントに影響しづらくなる
- デメリット
  - Facadeクラスがゴッドクラスになる可能性がある（単一責任の原則に違反）
- 使いどころ
  - 複雑なサブシステムの一部の機能を利用する場合
  - 複数のクラスの処理を呼び出す一連のコードが色々な箇所に書かれている場合
- オブジェクト指向的要素
  - カプセル化

## クラス図

### モデル

- `Facade`はシステム内部のクラス間の関係を知っており、処理は各クラスに委譲する

``` mermaid
classDiagram
  direction LR

  class Client
  class Facade
  class ClassA
  class ClassB
  class ClassC
  class ClassD

  Client --> Facade: Association
  Facade --> ClassA: Association
  Facade --> ClassB: Association
  Facade --> ClassC: Association
  Facade --> ClassD: Association
  ClassA --> ClassB: Association
  ClassD --> ClassC: Association
  ClassB --> ClassC: Association
  ClassC --> ClassB: Association
```

### 適用例

- 商品を発注する際の一連の手続きには順番があるため、Facadeとしてまとめる

``` mermaid
classDiagram
  direction LR

  class Client
  class OrderFacade {
    placeOrder(name: string)
  }

  class Invoice {
    sendInvoice(name: string)
  }

  class Payment {
    makePayment(name: string)
  }

  class Product {
    getProduct(name: string)
  }

  Client --> OrderFacade: Association
  OrderFacade --> Invoice: Association
  OrderFacade --> Payment: Association
  OrderFacade --> Product: Association
```