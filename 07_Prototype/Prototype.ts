export {}

type Detail = {'comment': string[]};

abstract class ItemPrototype {
  constructor(
    public name: string,
    public detail: Detail = {'comment': []}
  ) {}

  addComment(comment: string): void {
    this.detail.comment.push(comment);
  }

  abstract createCopy(): ItemPrototype;
}

class DeepCopyItem extends ItemPrototype {
  createCopy(): ItemPrototype {
    return new DeepCopyItem(this.name, structuredClone(this.detail));
  }
}

class ItemManager {
  private items = new Map<string, ItemPrototype>();

  register(key: string, item: ItemPrototype): void {
    this.items.set(key, item);
  }

  create(key: string): ItemPrototype {
    const originalItem: ItemPrototype | undefined = this.items.get(key);
    if (originalItem !== undefined) {
      return originalItem.createCopy();
    } else {
      throw new Error('指定されたキーは存在しません');
    }
  }
}

function main(): void {
  const mouse = new DeepCopyItem('マウス');
  mouse.addComment('original');

  const itemManager = new ItemManager();
  itemManager.register('mouse', mouse);

  const mouseCopy = itemManager.create('mouse');
  mouseCopy.addComment('copy');

  console.log(mouse);
  console.log(mouseCopy);
}

main();