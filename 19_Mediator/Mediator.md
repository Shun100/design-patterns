# Mediator

- 概要
  - 関連し合うオブジェクト間のやりとりを仲介者となるオブジェクトに集約し、オブジェクト同士が直接やり取りすることを制限するパターン
- メリット
  - オブジェクト同士のやりとりを集約し、理解しやすさと保守性を高めることができる
  - `Colleague`オブジェクト間の結びつきを弱くする
- デメリット
  - `Mediator`がGod classになる可能性がある
- 使いどころ
  - 多くのオブジェクト同士が直接つながっている場合
- オブジェクト指向的要素
  - カプセル化

## クラス図

### モデル

- `Mediator`と`Colleague`は互いに参照し合っており、相互依存の関係にある。
  - 相互依存は一般的には避けるべき設計だが、この場合は`Mediator`は`Colleague`のabstract class, `Colleague`は`Mediator`のinterfaceに依存しており、互いに抽象に依存していることからアンチパターンには当てはまらない。

``` mermaid
classDiagram
  direction LR

  class Mediator {
    <<interface>>
    createColleagues()
    colleageCharged()
  }
  class ConcreteMediator {
    concreteColleague1
    concreteColleague2
    createColleagues()
    colleagueCharged()
  }
  class Colleague {
    <<abstract>>
    mediator: Mediator
    setMediator()
    controlColleague()
  }
  class ConcreteColleague1 {
    controlColleague()
  }
  class ConcreteColleague2 {
    controlColleague()
  }

  ConcreteMediator ..|> Mediator: Implementation
  ConcreteMediator o--> ConcreteColleague1: Aggregation
  ConcreteMediator o--> ConcreteColleague2: Aggregation
  ConcreteColleague1 --|> Colleague: Inheritance
  ConcreteColleague2 --|> Colleague: Inheritance
```

### 適用例

- チャットルーム

``` mermaid
classDiagram
  direction LR

  class Mediator {
    <<interface>>
    registerUser(user: User)
    sendMessage(msg: string, sender: User)
  }
  class ChatRoom {
    -members: User[]
    registerUser(user: User)
    sendMessage(msg: string, sender: Uesr)
  }
  class User {
    <<abstract>>
    #mediator: Mediator
    #name: string
    send(msg: string)
    receive(msg: string)
  }
  class ChatUser {
    send(msg: string)
    receive(msg: stirng)
  }

  ChatRoom ..|> Mediator: Implementation
  ChatRoom o--> ChatUser: Aggregation
  User o--> Mediator: Aggregation
  ChatUser --> User: Inheritance
```