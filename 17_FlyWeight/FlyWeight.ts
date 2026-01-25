export {}

class Stamp {
  constructor(private char: string) {} // 外部からインスタンス化を禁止したけれが、Stampクラスの中にFactoryクラスを内包させてprivateにする

  print(): void {
    console.log(this.char);
  }
}

class StampFactory {
  private pool: Map<string, Stamp> = new Map();

  getStamp(char: string): Stamp {
    const stamp = this.pool.get(char);

    if (stamp) {
      return stamp;
    } else {
      const newStamp = new Stamp(char);
      this.pool.set(char, newStamp);
      return newStamp;
    }
  }

  getPool(): Map<string, Stamp> {
    return this.pool;
  }
}

function main(): void {
  const stampFactory = new StampFactory();

  const firstStamp = stampFactory.getStamp('a');
  const secondStamp = stampFactory.getStamp('a');

  console.log(stampFactory.getPool());
}

main();
