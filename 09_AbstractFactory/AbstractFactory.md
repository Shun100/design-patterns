# AbstractFactory

- 概要
  - 関連したオブジェクト（部品）のセットを、具体的なクラスを指定することなく生成するためのインタフェース（API）を提供するパターン
- メリット
  - 具体的なクラスをクライアントから隠蔽できる
  - 利用する部品分の整合性を保てる
    - `ConcreteFactory`経由でアクセスするので、一部の部品だけ誤って設定してしまう恐れが無い
- デメリット
  - クラス数が多く煩雑
- 使いどころ
  - 関連する部品群を決められた種別ごとに整合性を保って切り替えたい場合
    - 例. Windows用のテキストボックス・ボタン、Mac用のテキストボックス・ボタンのように、GUI部品をOSごとに切り替える
- オブジェクト指向的要素
  - ポリモーフィズム
- 補足 Factoryパターンとの違い
  - 生成するインスタンス数
    - Factory: 1つ
    - Abstract Factory: 複数の部品のセット
  - 抽象化の対象
    - Factory: メソッド
    - Abstract Factory: クラス（インタフェース）

## クラス図

### モデル

``` mermaid
classDiagram
  namespace Abstract {
    class AbstractFactory {
      <<interface>>
      createProduct1()
      createProduct2()
      createProduct3()
    }
    class AbstractProduct1 {
      <<interface>>
      executeA()
      executeB()
    }
    class AbstractProduct2 {
      <<interface>>
      doAlpha()
      doBeta()
    }
    class AbstractProduct3 {
      <<interface>>
      performOne()
      performTwo()
    }
  }

  namespace Concrete {
    class ConcreteFactory {
      createProduct1()
      createProduct2()
      createProduct3()
    }
    class ConcreteProduct1 {
      executeA()
      executeB()
    }
    class ConcreteProduct2 {
      doAlpha()
      doBeta()
    }
    class ConcreteProduct3 {
      performOne()
      performTwo()
    }
  }

  AbstractFactory --> AbstractProduct1: Association
  AbstractFactory --> AbstractProduct2: Association
  AbstractFactory --> AbstractProduct3: Association

  ConcreteFactory --> ConcreteProduct1: Association
  ConcreteFactory --> ConcreteProduct2: Association
  ConcreteFactory --> ConcreteProduct3: Association

  ConcreteFactory --|> AbstractFactory: inheritance
  ConcreteProduct1 --|> AbstractProduct1: inheritance
  ConcreteProduct2 --|> AbstractProduct2: inheritance
  ConcreteProduct3 --|> AbstractProduct3: inheritance
```

### 適用例

``` mermaid
classDiagram
  namespace Abstract {
    class GUIFactory {
      <<interface>>
      createButton(): Button
      createCheckBox(): CheckBox
    }
    class CheckBox {
      <<interface>>
      switch()
    }
    class Button {
      <<interface>>
      press()
    }
  }

  namespace Concrete {
    class WindowsGUIFactory {
      createButton(): Button
      createCheckBox(): CheckBox
    }
    class WindowsCheckBox {
      switch()
    }
    class WindowsButton {
      press()
    }
  }

  GUIFactory --> CheckBox: Association
  GUIFactory --> Button: Association

  WindowsGUIFactory ..|> GUIFactory: Implementation
  WindowsGUIFactory --> WindowsCheckBox: Association
  WindowsGUIFactory --> WindowsButton: Association

  WindowsCheckBox ..|> CheckBox: Implementation

  WindowsButton ..|> Button: Implementation
```