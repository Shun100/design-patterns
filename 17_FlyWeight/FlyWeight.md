# FlyWeight

- 概要
  - インスタンス化されたオブジェクトを効率よく共有することで、生成されるオブジェクトやリソースの消費を抑えるパターン
    - 制約事項: 環境や状況によって変化しない情報のみを共有すること
- メリット
  - 生成されるオブジェクトやリソースの消費を抑える(リソースの消費を抑える)
- デメリット
  - コードが複雑化し、可読性が落ちる
  - 共有するオブジェクトの変更により想定外のバグが生まれる
- 使いどころ
  - 同一のオブジェクトを大量に使用する場合
  - インスタンス生成によるリソースの消費を抑えたい場合
- オブジェクト指向的要素
  - なし

## クラス図

### モデル

``` mermaid
classDiagram
  direction LR

  class Client
  class FlyWeight {
    methodA()
    methodB()
  }
  class FlyWeightFactory {
    pool
    getFlyWeight()
  }

  Client --> FlyWeightFactory: Association
  FlyWeightFactory o--> FlyWeight: Aggregation
```

### 適用例

- 文字スタンプ

``` mermaid
classDiagram
  direction LR

  class Client
  class Stamp {
    -char
    print()
  }
  class StampFactory {
    -pool
    getStamp(char) Stamp
    getPool()
  }
```