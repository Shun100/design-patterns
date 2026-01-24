# Composite

- 概要
  - ツリー構造を持つデータに再帰的な処理を行うパターン
- メリット
  - 複雑なツリー構造を簡単に扱うことができる
  - 新しい枝葉を簡単に追加できる
- デメリット
  - 枝と葉の機能が大きくことなる場合は適用が困難
- 使いどころ
  - 再帰的なツリー構造を実装する場合
    - 例. ディレクトリツリー、組織階層、DOMツリー
- オブジェクト指向的要素
  - ポリモーフィズム

## クラス図

### モデル

``` mermaid
classDiagram
  direction LR

  class Client
  class Component {
    <<abstract>>
    method1()
    method2()
  }
  class Leaf {
    method1()
    method2()
  }
  class Composite {
    children: Component
    method1()
    method2()
    add()
    remove()
    getChild()
  }

  Client --> Component: Association (Use)
  Leaf --|> Component: Inheritance
  Composite --|> Component: Inheritance
  Composite o--> Component: Aggregation
```

### 適用例

``` mermaid
classDiagram
  direction LR

  class Client
  class Entry {
    <<abstract>>
    -name: string
    getName() string
    getSize() number
    remove() void
  }
  class File {
    -size: number
    getSize() number
    remove() void
  }
  class Directory {
    -children: Entry[]
    getSize() number
    remove() void
    add(child: Entry) void
  }

  Client --> Entry: Association (Use)
  File --|> Entry: Inheritance
  Directory --|> Entry: Inheritance
  Directory o--> Entry: Aggregation
```