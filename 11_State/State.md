# State

- 概要
  - 複数の状態を別個のクラスで定義し、状態が変化したときに振る舞いを切り替えられるようにするパターン
- メリット
  - 特定の状態における実装の詳細を別クラスに分離できる
  - 状態に固有の処理を選択するための条件文が無くなる
  - 状態の追加が容易になる（オープンクローズドの原則）
- デメリット
  - 小さなシステムでは過剰な設計になる
- 使いどころ
  - 現在の状態に応じて異なる振る舞いをするオブジェクトがあり、その状態数が多い場合
  - 状態の内容が変更にされる場合
  - 状態に固有の処理をさせるための条件分岐がいくつもある場合
- オブジェクト指向的要素
  - 継承、ポリモーフィズム、委譲

## クラス図

### モデル

``` mermaid
classDiagram
  direction LR

  class Context {
    state: State
    request()
  }
  class State {
    <<interface>>
    stateMethod()
  }
  class ConcreteState1 {
    stateMethod()
  }
  class ConcreteState2 {
    stateMethod()
  }

  Context o--> State: Aggregation
  ConcreteState1 ..|> State: Implementation
  ConcreteState2 ..|> State: Implementation
```

### 適用例

``` mermaid
classDiagram
  direction LR
  
  class User {
    -state: UserState
    isAuthenticated() boolean
    displayPage() void
    switchState() UserState
  }
  class UserState {
    <<interface>>
    isAuthenticated() boolean
    displayPage() void
    nextState() UserState
  }
  class AuthorizedState {
    isAuthenticated() boolean
    displayPage() void
    nextState() UserState
  }
  class UnAuthorizedState {
    isAuthenticated() boolean
    displayPage() void
    nextState() void
  }

  User o--> UserState: Aggregation
  AuthorizedState ..|> UserState: Implementation
  UnAuthorizedState ..|> UserState: Implementation
```