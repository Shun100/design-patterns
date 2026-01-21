# Adapter

- 概要
  - あるクラスのインタフェースを、そのクラスを利用する側が求める他のインタフェースへ変換するパターン
- メリット
  - 既存のクラス(`Adaptee`)を修正しなくて済むので再テスト不要
  - 変換のためのコードをビジネスロジックと分離できるので単一責任の原則に違反しない
  - インタフェースを介してアダプタと連携するのでオープンクローズドの原則に違反しない
- デメリット
  - インタフェースやクラスが増えるため、小さなシステムでは返って複雑になる(`Adaptee`を直接修正する方が良い)
- 使いどころ
  - 過去に十分テストされて実績のあるクラスに手を加えず再利用したい場合
  - `Adaptee`がビルド済みの状態で提供されており、ソースコードに手を加えられない場合
- オブジェクト指向的要素
  - 継承、委譲

## クラス図

### モデル

- `Client`クラスから`Adaptee`クラスを利用したい
- ただし、この2つのクラス間に互換性は無いため、間に`Adapter`クラスを噛ませる
- `Adapter`クラスには2つの実装方法がある
  1. `Adaptee`クラスを実装する方法(Inheritance version)
  2. `Adaptee`クラスに処理を委譲する方法(Composition version)
- 継承はリズコフの置換原則に違反しないよう気をつける必要があるので、委譲の方が安全


``` mermaid
---
title: Inheritance version
---
classDiagram
  class Client
  
  class Target {
    <<interface>>
    targetMethod1()
    targetMethod2()
  }

  class Adapter {
    targetMethod1()
    targetMethod2()
  }

  class Adaptee {
    methodA()
    methodB()
    methodC()
  }

  Client --> Target: Association
  Adapter ..|> Target: Realization
  Adapter --|> Adaptee: inheritance
```

<br>

``` mermaid
---
title: Composition version
---
classDiagram
  class Client
  
  class Target {
    <<interface>>
    targetMethod1()
    targetMethod2()
  }

  class Adapter {
    adaptee: Adaptee
    targetMethod1()
    targetMethod2()
  }

  class Adaptee {
    methodA()
    methodB()
    methodC()
  }

  Client --> Target: Association
  Adapter ..|> Target: Implementation
  Adapter *--> Adaptee: Composition
```

### 適用例

- `Client`クラスはCSVにしか対応しておらず、一方で使いたい`NewLibrary`クラスはJSONを出力する

``` mermaid
classDiagram
  class Client

  class Target {
    <<interface>>
    getCsvData()
  }

  class JsonToCsvAdapter {
    -adaptee: NewLibrary
    getCsvData()
  }

  class NewLibary {
    getJsonData()
  }

  Client --> Target: Association
  JsonToCsvAdapter ..|> Target: Implementation
  JsonToCsvAdapter *..> NewLibary: Composition
```