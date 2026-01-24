# Factory

- 概要
  - 親クラスでインスタンスの生成方法を定め、具体的に何をどうやって作るかは子クラスで定めるパターン
- メリット
  - オープンクローズドの原則に違反することなく新しい`ConcreteCreator`, `ConcreteProduct`を追加するだけで済む
  - new演算子でインスタンス化するわけではないので、オブジェクトの利用側とオブジェクトの結びつきを弱くできる
- デメリット
  - 簡単な処理の場合は過剰な設計になる
- 使いどころ
  - 類似した複数種類のオブジェクトを生成する場合
    - オープンクローズドの原則に違反することなく別のオブジェクトの追加が可能
  - オブジェクトの生成ロジックが複雑な場合
    - `create`メソッドを呼び出すだけで複雑な生成ロジックを記述せずに生成可能
  - `Product`の種類や生成手順が頻繁に変更される可能性がある場合
    - 利用側と`Product`の結びつきが弱いので変更に強い設計になる
- オブジェクト指向的要素
  - 継承

## クラス図

### モデル

``` mermaid
classDiagram
  direction RL

  class Creator {
    <<abstract>>
    create()
    factoryMethod()
  }

  class ConcreteCreator {
    factoryMethod()
  }

  class Product {
    <<abstract>>
    method1()
    method2()
  }

  class ConcreteProduct {
    method1()
    method2()
  }

  Creator --> Product: Association
  ConcreteCreator --|> Creator: Inheritance
  ConcreteProduct --|> Product: Inheritance
  ConcreteCreator --> ConcreteProduct: Association
```

### 適用例

``` mermaid
classDiagram
  direction RL

  class CreditCardFactory {
    <<abstract>>
    create()
    createCreditCard(owner: string)
    registerCreditCard(creditCard: CreditCard)
  }

  class PlatinumCreditCardFactory {
    createCreditCard(owner: string)
    registerCreditCard(creditCard: CreditCard)
  }

  class CreditCard {
    <<abstract>>
    getOwner()
    getCardType()
    getAnnualCharge()
  }

  class Platinum {
    getCardType()
    getAnnualCharge()
  }

  CreditCardFactory --> CreditCard: Association
  PlatinumCreditCardFactory --|> CreditCardFactory: Inheritance
  Platinum --|> CreditCard: Inheritance
  PlatinumCreditCardFactory --> Platinum: Association
```