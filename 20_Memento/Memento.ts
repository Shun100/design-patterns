export {}

/**
 * 記憶用クラス（スナップショット）
 * スナップショットから情報を読み出す機能はあるが、編集機能は持たない
 * 編集の際はNotepadで読み込んでから編集
 */
class Memento {
  private date: string = new Date().toLocaleString('ja-JP'); // インスタンス生成（スナップショット作成）時刻

  protected constructor(protected memo: string) {} // このクラスおよび子クラスからのみインスタンス可

  getMemo(): string {
    return this.memo;
  }

  getInfo(): string {
    return `${this.date} / ${this.memo}`;
  }
}

// 記憶対象クラス（Originator）
class Notepad extends Memento {
  constructor(memo: string) {
    super(memo);
  }

  addMemo(memo: string): void {
    this.memo = memo; // ここは一時保存
  }

  // スナップショットを保存
  save(): Memento {
    console.log('メモを保存しました');
    return new Memento(this.memo);  // ここで保存 Mementoのインスタンスを返すということは、すなわちMementoはスナップショットそのもの
  }

  // スナップショットから復元
  restore(memento: Memento): void {
    console.log('メモを復元しました');
    this.memo = memento.getMemo();
  }
}

// 履歴管理クラス
class Caretaker {
  private mementos: Memento[] = [];

  constructor(private notepad: Notepad) {}

  backup(): void {
    this.mementos.push(this.notepad.save());
  }

  undo(): void {
    const memento = this.mementos.pop();

    if (memento) {
      this.notepad.restore(memento);
    }
  }

  showHistory(): void {
    console.log();
    console.log('=== History ===');
    this.mementos.forEach(memento => console.log(memento.getInfo()));
  }
}

function main(): void {
  const notepad = new Notepad('');
  const caretaker = new Caretaker(notepad);
  caretaker.backup();

  notepad.addMemo('first memo');
  caretaker.backup();

  notepad.addMemo('second memo');
  caretaker.backup();

  console.log(`current memo: ${notepad.getMemo()}`);
  caretaker.showHistory();

  console.log();
  console.log('=== ここから復元 ===');

  caretaker.undo();
  console.log(`current memo: ${notepad.getMemo()}`);
  
  caretaker.undo();
  console.log(`current memo: ${notepad.getMemo()}`);
  
  caretaker.undo();
  console.log(`current memo: ${notepad.getMemo()}`);

  caretaker.showHistory();
}

main();
