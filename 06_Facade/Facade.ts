export {}

class Product {
  getProduct(name: string): void {
    console.log(`${name}を取得しました`);
  }
}

class Payment {
  makePayment(name: string): void {
    console.log(`${name}の支払いが完了しました`);
  }
}

class Invoice {
  sendInvoice(name: string): void {
    console.log(`${name}の請求書が送信されました`);
  }
}

class OrderFacade {
  placeOreder(name: string): void {
    console.log('注文開始');
    new Product().getProduct(name);
    new Payment().makePayment(name);
    new Invoice().sendInvoice(name);
    console.log('注文完了');
  }
}

function main(): void {
  const orderFacade = new OrderFacade();
  orderFacade.placeOreder('ゼロから作るDeep Learning');
}

main();