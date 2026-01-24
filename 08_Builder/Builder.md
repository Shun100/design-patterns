# Builder

- 概要
  - 同じ生成手順で異なる材料を使って異なるオブジェクトを生成するパターン
- メリット
  - 生成されるオブジェクトの生成過程や生成手段を隠蔽できる
  - オブジェクト構築用のコードをビジネスロジックから分離できる
- デメリット
  - 小さなシステムでは過剰な設計になる
- 使いどころ
  - 生成手順が同じで詳細が異なるオブジェクトを生成する場合
  - コンストラクタのパラメータが多い場合
- オブジェクト指向的要素
  - 継承、ポリモーフィズム、委譲

## クラス図

### モデル

- `Builder`: オブジェクトの生成手段となるAPIを提供する
- `ConcreteBuilder`: APIの実装
- `Director`: AIPを使ってオブジェクトを生成する

``` mermaid
classDiagram
  direction LR
  
  class Client
  class Director {
    builder
    construct()
  }

  class Builder {
    <<interface>>
    buildPart1()
    buildPart2()
    buildPart3()
  }

  class ConcreteBuilder {
    buildPart1()
    buildPart2()
    buildPart3()
    getResult()
  }

  class Product

  Client --> Director: Association
  Client --> ConcreteBuilder: Association
  Director *--> Builder: Composition
  ConcreteBuilder ..|> Builder: Implementation
  ConcreteBuilder --> Product: Association
```

### 適用例

``` mermaid
classDiagram
  direction LR

  class Client
  class Director {
    builder: ComputerBuilder
    construct()
    highSpecConstruct()
  }

  class ComputerBuilder {
    <<interface>>
    addCpu(cpu: string)
    addRam(ram: number)
  }

  class DesktopBuilder {
    -computer: Computer
    addCpu(cpu: string)
    addRam(ram: number)
    getResult() Computer
  }

  class LaptopBuilder {
    -computer: Computer
    addCpu(cpu: string)
    addRam(ram: number)
    getResult(): Computer
  }

  class Computer {
    type: string
    cpu: string
    ram: number
  }

  Client --> Director: Association
  Client --> DesktopBuilder: Association
  Client --> LaptopBuilder: Association

  Director o--> ComputerBuilder: Aggregation

  DesktopBuilder ..|> ComputerBuilder: Implementation
  DesktopBuilder --> Computer: Assoctiation

  LaptopBuilder ..|> ComputerBuilder: Implementation
  LaptopBuilder --> Computer: Association
```