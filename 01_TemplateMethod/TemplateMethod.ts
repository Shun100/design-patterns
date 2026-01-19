export {}

abstract class TestTemplate {
  test(): void {
    this.setup();     // テスト実行前の準備
    this.execute();   // テスト実行
    this.teardown();  // テスト実行前の状態に戻す
  }

  protected abstract setup(): void;
  protected abstract execute(): void;

  teardown(): void {
    console.log('teardown');
  }
}

class ItemServiceTest extends TestTemplate {
  protected setup(): void {
    console.log('setup: ItemServiceTest');
  }

  protected execute(): void {
    console.log('execute: ItemServiceTest');
  }
}

class UserServiceTest extends TestTemplate {
  protected setup(): void {
    console.log('setup: UserServiceTest');
  }

  protected execute(): void {
    console.log('execute: UserServiceTest');
  }
}

function main(): void {
  const itemServiceTest = new ItemServiceTest();
  const userServiceTest = new UserServiceTest();

  itemServiceTest.test();
  userServiceTest.test();
}

main();