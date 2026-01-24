# Strategy

- 概要
  - 複数のアルゴリズムを定義し、切り替えられるようにするパターン
- メリット
  - 実行時にオブジェクト内で使用されるアルゴリズムを交換できる
  - アルゴリズムの実装の詳細を利用側のコードから分離できる
  - アルゴリズムの追加が容易（オープンクローズドの原則）
- デメリット
  - 小さなシステムでは過剰な設計になる
- 使いどころ
  - ある問題を解決するための方法が複数あり、プログラム実行時に動的に切り替えたい場合
  - クラス内にアルゴリズムを切り替えための条件文がいくつもある
- オブジェクト指向的要素
  - 継承、ポリモーフィズム、委譲

## クラス図

### モデル

``` mermaid
classDiagram
  direction LR

  class Context {
    strategy: Strategy
    contextMethod()
  }
  class Strategy {
    <<interface>>
    strategyMethod()
  }
  class ConcreteStrategy1 {
    strategyMethod()
  }
  class ConcreteStrategy2 {
    strategyMethod()
  }

  Context o--> Strategy: Aggregation
  ConcreteStrategy1 ..|> Strategy: Implementation
  ConcreteStrategy2 ..|> Strategy: Implementation
```

### 適用例

``` mermaid
classDiagram
  direction LR

  class SortContext {
    strategy: SortStrategy
    sort()
  }
  class SortStrategy {
    <<interface>>
    sort()
  }
  class BubbleSort {
    sort()
  }
  class InsertionSort {
    sort()
  }

  SortContext o--> SortStrategy: Aggregation
  BubbleSort ..|> SortStrategy: Implementation
  InsertionSort ..|> SortStrategy: Implementation
```