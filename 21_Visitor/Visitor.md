# Visitor

- 概要
  - データ構造とそれに対する操作でクラスを分けるパターン
    - 操作を行うクラスがデータ構造を表すクラスを順に訪問して処理を行う
- メリット
  - 共通的な操作を一か所にまとめられる
  - 新しい操作の追加が容易
- デメリット
  - 新しいデータ構造の追加は困難
    - 全ての`Visitor`に修正が必要
- 使いどころ
  - ツリー構造のような複雑なオブジェクト構造の全ての要素に対して、操作を実行する場合
  ^ 特定のデータ構造に対して、操作を色々変えたい場合
- オブジェクト指向的要素
  - ダブルディスパッチを利用
    - 訪問者と受け入れる側がお互いのメソッドを呼び出す
      - 受け入れる側のメソッド: `element.accept(visitor)`
      - 訪問する側のメソッド: `visitor.visit(element)`

## クラス図

### モデル

``` mermaid
classDiagram
  direction LR

  class Client
  class Visitor {
    <<interface>>
    visit(element)
  }
  class ConcreteVisitor {
    visit(element)
  }
  class Element {
    <<abstract>>
    accept(visitor)
  }
  class ConcreteElement {
    accept(visitor)
  }

  Client --> Visitor: Association
  Client --> Element: Association
  ConcreteVisitor ..|> Visitor: Implementation
  ConcreteElement --> Element: Inheritance
```

### 適用例

- 組織階層

``` mermaid
classDiagram

  class Client
  class Visitor {
    <<interface>>
    visit(entry: Entry)
  }
  class ListVisitor {
    visit(entry: Entry)
  }
  class CountVisitor {
    -groupCount: number
    -employeeCount: number
    visit(entry: Entry)
    getGroupCount() number
    getEmployeeCount() number
  }
  class Entry {
    <<abstract>>
    -code: string
    -name: string
    getCode() string
    getName() string
    getChildren() Entry[]
    accept(visitor: Visitor)
  }
  class Group {
    -entries: Entry[]
    add(entry: Entry)
    getChildren() Entry[]
    accept(visitor: Visitor)
  }
  class Employee {
    getChildren() Entry[]
    accept(visitor: Visitor)
  }

  Client --> Visitor: Association
  Client --> Entry: Association
  ListVisitor ..|> Visitor: Implementation
  CountVisitor ..|> Visitor: Implementation
  Group --|> Entry: Inheritance
  Employee --|> Entry: Inheritance
```