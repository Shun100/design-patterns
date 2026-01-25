# Memento

- 概要
  - オブジェクトの現在の状態を保存しておき、状態が変化した後でも戻せるようにするパターン
    - Undo機能
- メリット
  - オブジェクトの状態のスナップショットを作成・復元できる
  - スナップショットの管理を`Caretaker`に任せることで、`Originator`をシンプルに保てる
- デメリット
  - `Memento`を大量に生成するとメモリ使用量が増加する
  - プログラミング言語の仕様によって、構成の変更が必要
    - packageシステムのある言語ではGOFのデザインパターン通りに実装できるが、無い言語では`Originator`を継承して`Memento`を作る必要がある
- 使いどころ
  - オブジェクトの状態を復元するためのスナップショットを作成したい場合
    - メモ帳のUndo機能、ゲームのセーブ機能
- オブジェクト指向的要素
  - カプセル化の破壊を防ぐ
    - Mementoパターンを使わずに内部状態を保存・復元する場合、状態を外部に公開する必要がある（カプセル化の破壊）
    - `Originator`自身が保存操作を行うことで、内部状態を非公開のままスナップショットを作成できる
    - `Memento`のconstructorをprotectedにすることで、`Memento`のインスタンス生成を`Originator`のみに制限する

## クラス図

### モデル

- `Originator`: 保存対象
- `Memento`: 記憶用クラス
- `Caretaker`: 履歴管理クラス

``` mermaid
classDiagram
  direction LR

  class Originator {
    #state
    save() Memento
    resotre(memento)
  }
  class Memento {
    #state
    #Memento()
    getState()
  }
  class Caretaker {
    -memento
    buckup()
    undo()
  }

  Originator --> Memento: Association
  Caretaker --> Originator: Association
  Caretaker o--> Memento: Aggregation
```

### 適用例

``` mermaid
classDiagram
  direction LR

  class Notepad {
    #memo: string
    addMemento(memo: string)
    save() Memento
    restore(memento: Memento)
  }
  class Memento {
    #memo: string
    -date: string
    #Memento()
    getMemo() string
    getInfo() string
  }
  class Caretaker {
    -mementos: Memento[]
    -notepad: Notepad
    buckup(notepad: Notepad)
    undo()
    showHistory()
  }

  Notepad --> Memento: Association
  Caretaker --> Notepad: Association
  Caretaker o--> Memento: Aggregation
```