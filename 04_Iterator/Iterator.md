# Iterator

- 概要
  - コレクションの内部構造を利用者に見せずに、その要素に順番にアクセスする方法を提供するパターン
- メリット
  - 利用者がコレクションの構造を知らなくても使える
  - コレクションの実装と操作（探索アルゴリズム）を分離できる
  - 既存のコードに修正を加えることなく新しい種類のコレクションやイテレータを追加できる（オープンクローズドの原則）
- デメリット
  - 単純なコレクションの場合は過剰な設計になる
- 使いどころ
  - コレクションが複雑な構造をしており、利用者から隠したい場合
  - 探索のための方法を複数持たせたい場合
- オブジェクト指向的要素
  - カプセル化の逆（通常はデータと操作を1クラスにまとめるが、操作とデータを別クラスに分ける）

## クラス図

### モデル

- `Iterator`: コレクションを探索するために必要な操作を定義するインタフェース
- `ConcreteIterator`: 探索を行う対象のコレクション`aggregate`をフィールドに持つ
- `Aggregate`: コレクションを表すインタフェース `Iterator`を生成するメソッドを持つ

``` mermaid
classDiagram
  direction RL
  class Aggregate {
    <<interface>>
    getIterator() Iterator
  }

  class ConcreteAggregate {
    getIterator() Iterator
  }

  class Iterator {
    <<interface>>
    hasNext() boolean
    next()
  }

  class ConcreteIterator {
    aggregate
    hasNext() boolean
    next()
  }

  Aggregate --> Iterator: Association
  ConcreteAggregate ..|> Aggregate: Implementation
  ConcreteIterator ..|> Iterator: Implementation
  ConcreteIterator *--> ConcreteAggregate: Composition
```

### 適用例

``` mermaid
classDiagram
  direction RL
  
  class Aggregate {
    <<interface>>
    getIterator() Iterator
  }

  class Iterator {
    <<interface>>
    hasNext() boolean
    next()
  }

  class WaitingRoom {
    -patients: Patient[]
    getPatients() Patient[]
    getCount() number
    checkIn() void
    getIterator() Iterator
  }

  class WaitingRoomIterator {
    -aggregate: WaitingRoom
    -position: number

    hasNext() boolean
    next() Patient
  }

  class Patient {
    id: number
    name: string
  }

  Aggregate --> Iterator: Association
  WaitingRoom --|> Aggregate: Implementation
  WaitingRoomIterator --|> Iterator: Implementation
  WaitingRoomIterator *--> WaitingRoom: Composition
  WaitingRoom --> Patient: Association
```