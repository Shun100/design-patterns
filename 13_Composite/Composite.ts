export {}

abstract class Entry {
  constructor(protected name: string) {}

  getName(): string {
    return this.name;
  }

  abstract getSize(): number;
  abstract remove(): void;
}

class File extends Entry {
  constructor(protected name: string, private size: number) {
    super(name);
  }

  getSize(): number {
    return this.size;
  }

  remove(): void {
    console.log(`ファイル ${this.name} を削除しました`);
  }
}

class Directory extends Entry {
  private children: Entry[] = [];

  getSize(): number {
    let totalSize = 0;
    this.children.forEach(child => totalSize += child.getSize());
    return totalSize;
  }

  remove(): void {
    this.children.forEach(child => child.remove());
    console.log(`ディレクトリ ${this.name} を削除しました`);
  }

  add(child: Entry): void {
    this.children.push(child);
  }
}

function main(): void {
  const book1 = new File('ゼロから作るDeep Learning2 自然言語処理編', 100);
  const book2 = new File('ゼロから作るDeep Learning3 フレームワーク編', 80);
  const book3 = new File('ゼロから作るDeep Learning4 強化学習編', 120);
  const book4 = new File('ゼロから作るDeep Learning5 生成モデル編', 150);

  const rootDir = new Directory('書籍');
  const subDir1 = new Directory('購入済み');
  const subDir2 = new Directory('未購入');

  subDir1.add(book1);
  subDir1.add(book3);
  subDir1.add(book4);

  subDir2.add(book2);

  rootDir.add(subDir1);
  rootDir.add(subDir2);

  console.log(`総サイズ: ${rootDir.getSize()}`);
  rootDir.remove();
}

main();