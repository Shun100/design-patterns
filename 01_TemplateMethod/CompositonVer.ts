export {}

// 継承ではなく委譲を利用したパターン
class Template {
  constructor(private service: Service) {}

  run() {
    this.service.setup();
    this.service.execute();
    this.teardown();
  }

  private teardown(): void {
    console.log('teardown');
  }
}

interface Service {
  setup(): void;
  execute(): void;
}

class ItemService implements Service {
  setup(): void {
    console.log('ItemService: setup');
  }

  execute(): void {
    console.log('ItemSerive: execute');
  }
}

class UserService implements Service {
  setup(): void {
    console.log('UserService: setup');
  }

  execute(): void {
    console.log('UserSerive: execute');
  }
}

function main(): void {

  const itemService = new Template(new ItemService());
  const userService = new Template(new UserService());

  itemService.run();
  userService.run();
}

main();
