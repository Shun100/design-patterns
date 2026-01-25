export {}

abstract class ItemPublisher {
  private subscribers: Subscriber[] = [];

  constructor(private name: string) {}

  subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: Subscriber): void {
    this.subscribers = this.subscribers.filter(s => s !== subscriber);
  }

  protected notify(): void {
    this.subscribers.forEach(s => s.update(this.name));
  }

  showSubscribers(): void {
    console.log(this.subscribers);
  }

  abstract restock(): void;
}

class TvGamePublisher extends ItemPublisher {
  private inStock: boolean = false;

  restock(): void {
    if (this.inStock) {
      console.log('入荷済みのため通知はしない');
    } else {
      this.inStock = true;
      console.log('商品入荷 通知開始');
      this.notify();
      console.log('通知完了');
    }
  }
}

interface Subscriber {
  update(name: string): void;
}

class StoreSubscriber implements Subscriber {
  update(name: string): void {
    console.log(`${name}が入荷されました。仕入れ可能です。`); // 通知内容はSubscriber側で決める
  }
}

class PersonalSubscriber implements Subscriber {
  update(name: string): void {
    console.log(`${name}が入荷されました。購入可能です。`); // 通知内容はSubscriber側で決める
  }
}

function main(): void {
  const publisher = new TvGamePublisher('ゼロから作るDeep Learning');
  const storeSubscriber = new StoreSubscriber();
  const personalSubscriber = new PersonalSubscriber();

  publisher.subscribe(storeSubscriber);     // 購読
  publisher.subscribe(personalSubscriber);  // 購読

  publisher.restock();  // 通知

  publisher.showSubscribers();
  publisher.unsubscribe(personalSubscriber); // 解約
  publisher.showSubscribers();
}

main();
