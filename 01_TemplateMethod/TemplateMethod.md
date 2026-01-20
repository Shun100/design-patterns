# Template Method

- 概要
  - 親クラスで処理の枠組みを決め、子クラスで枠組みの具体的な内容を定める
- 使いどころ
  - 処理フローの全体構造を変えることなく、処理の一部のみを変更したい場合
  - 多少の違いはあるが、ほぼ同一の処理を持つクラスが複数ある場合
- オブジェクト指向的要素
  - 継承を利用したパターン

## クラス図

### モデル

``` mermaid
classDiagram
  class AbstractClass {
    <<abstract>>
    templateMethod()
    step1()
    step2()
    step3()
  }
  class ConcreteClass {
    step1()
    step2()
    step3()
  }

  AbstractClass <|-- ConcreteClass
```

### 適用例

``` mermaid
classDiagram
  class TestTemplate {
    <<abstract>>
    test()
    setup()
    execute()
    teardown()
  }
  class ItemServiceTest {
    setup()
    execute()
  }
  class UserServiceTest {
    setup()
    execute()
  }

  TestTemplate <|-- ItemServiceTest
  TestTemplate <|-- UserServiceTest
```