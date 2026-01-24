export {}

const database: CreditCard[] = []

abstract class CreditCardFactory {
  // Factory Method
  create(owner: string): CreditCard {
    const creditCard = this.createCreditCard(owner);
    this.registerCreditCard(creditCard);

    return creditCard;
  }

  abstract createCreditCard(owner: string): CreditCard;
  abstract registerCreditCard(creditCard: CreditCard): void;
}

class PlatinumCreditFactory extends CreditCardFactory {
  createCreditCard(owner: string): CreditCard {
    return new Platinum(owner);
  }

  registerCreditCard(creditCard: CreditCard): void {
    database.push(creditCard);
  }
}

class GoldCreditFactory extends CreditCardFactory {
  createCreditCard(owner: string): CreditCard {
    return new Gold(owner);
  }

  registerCreditCard(creditCard: CreditCard): void {
    database.push(creditCard);
  }
}

abstract class CreditCard {
  protected constructor(public owner: string) {} // 外部からnew演算子でインスタンス化できないようにする

  getOwner(): string {
    return this.owner;
  }

  abstract getCardType(): string;
  abstract getAnnualCharge(): number;
}

class Platinum extends CreditCard {
  getCardType(): string {
    return 'Platinum';
  }

  getAnnualCharge(): number {
    return 30000;
  }
}

class Gold extends CreditCard {
  getCardType(): string {
    return 'Gold';
  }

  getAnnualCharge(): number {
    return 5000;
  }
}

function main(): void {
  const platinumFactory = new PlatinumCreditFactory();
  const goldFactory = new GoldCreditFactory();

  platinumFactory.create('Suzuki'); // インスタンス化 + DBへの登録を一括で行ってくれるのでシンプルになる
  goldFactory.create('Tanaka');

  console.log(database);
}

main();