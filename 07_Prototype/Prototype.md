# Prototype

- 概要
  - 原型となるインスタンスをコピーして新しいインスタンスを生成するパターン
    - 親クラスでインスタンスをコピーするためのメソッドを定義し、子クラスで自分自身のコピーを返すよう実装する
- メリット
  - オブジェクトの生成処理を隠蔽できる
  - 構築済みのプロトタイプのクローンの作成を使うことにより、初期化コードの重複を削減
  - 利用者と具体的なクラスの結合度を弱められる
- デメリット
  - 浅いコピーと深いコピーを意識しないと想定外のバグを生む
    - 浅いコピーと深いコピー
      - 浅いコピーはオブジェクトの参照をコピーする ⇒ どちらかのオブジェクトを変更すると、もう片方も変更される
      - 深いコピーはオブジェクトの実態をコピーする ⇒ どちらかのオブジェクトを変更しても、もう片方に影響なし
- 使いどころ
  - クラスからのインスタンス生成が難しい場合
    - 例. Power Pointの図形のコピー
  - インスタンス化のコストがコピーよりも高い場合
    - 例. コンストラクタの引数がたくさんある場合
- オブジェクト指向的要素
  - 継承とポリモーフィズム

## クラス図

### モデル

``` mermaid
classDiagram
  direction LR
  
  class Manager
  class Prototype {
    <<interface>>
    createCopy()
  }

  class ConcretePrototype {
    createCopy()
  }

  Manager --> Prototype: Association
  ConcretePrototype ..|> Prototype: Implementation
```

### 適用例

``` mermaid
classDiagram
  direction LR

  class ItemManager {
    itmes: Map(string, ItemPrototype)
    registerItem(key: string, item: ItemPrototype)
    create(key: string)
  }

  class ItemPrototype {
    name: string
    detail: object
    addComment()
    createCopy() ItemPrototype
  }

  class DeepCopyItem {
    createCopy() ItemPrototype
  }

  ItemManager --> ItemPrototype: Association
  DeepCopyItem --|> ItemPrototype: Inheritance
```