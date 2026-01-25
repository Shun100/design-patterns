# Observer

- 概要
  - 観察対象のオブジェクトに状態変化が発生した際に、そのオブジェクトの観測者に対して通知を行うパターン
    - Pub-Subパターンとも呼ぶ（観測対象: `Publisher` 観測者: `Subscriber`）
- メリット
  - 実行時に観測者の変更が可能
  - 観測者と観測対象のつながりを弱めることができる
  - 新たな観測対象の追加や削除が容易になる
- デメリット
  - 通知の順番に依存しない実装にしないと予期しないバグが発生する可能性がある
- 使いどころ
  - 状態変化に応じた処理を行う場合
    - ニュースサイト、SNSなどの通知
  - Angularに採用されているRxJS（Observerパターンに従って実装されている）
  - オブジェクトを一時的に監視したい場合
- オブジェクト指向的要素
  - 継承、ポリモーフィズム

## クラス図

### モデル

``` mermaid
classDiagram
  direction LR
  
  class Subject {
    <<abstract>>
    observers
    attach(observer)
    detach(observer)
    notify()
    execute()
  }
  class Observer {
    <<interface>>
    update()
  }
  class ConcreteSubject {
    subjectState
    execute()
  }
  class ConcreteObserver {
    update()
  }

  Subject o--> Observer: Aggregation
  ConcreteSubject --|> Subject: Inheritance
  ConcreteObserver ..|> Observer: Implementation
```

### 適用例

``` mermaid
classDiagram
  direction LR

  class ItemPublisher {
    <<abstract>>
    -name: string
    -observers: Observer[]
    suscribe(observer)
    unsubscribe(observer)
    notify()
    restock()
  }
  class TVGamePublisher {
    -inStock: boolean
    restock()
  }
  class Subscriber {
    <<interface>>
    update()
  }
  class StoreSucscriber {
    upate()
  }
  class PersonalSubscriber {
    update()
  }

  ItemPublisher o--> Subscriber: Aggregation
  TVGamePublisher --|> ItemPublisher: Inheritance
  StoreSucscriber ..|> Subscriber: Implementation
  PersonalSubscriber ..|> Subscriber: Implementation
```