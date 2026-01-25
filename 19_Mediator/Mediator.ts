export {}

/**
 * 依存関係
 * - ChatRoom --> User <<abstract>>
 * - User <<abstract>> --> Mediator <<interface>>
 */

interface Mediator {
  registerUser(user: User): void;
  sendMessage(msg: string, dst: User): void;
}

class ChatRoom implements Mediator {
  private members: User[] = [];

  registerUser(user: User): void {
    this.members.push(user);
  }

  sendMessage(msg: string, sender: User): void {
    this.members
      .filter(member => member !== sender)
      .forEach(member => member.receive(msg));
  }
}

abstract class User {
  constructor(protected mediator: Mediator, protected name: string) {}

  abstract send(msg: string): void;
  abstract receive(msg: string): void;
}

class ChatUser extends User {
  send(msg: string): void {
    console.log(`${this.name} => メッセージ送信`);
    this.mediator.sendMessage(msg, this);
  }

  receive(msg: string):void {
    console.log(`${this.name}: メッセージ受信 ${msg}`);
  }
}

function main(): void {
  const chatRoom = new ChatRoom();

  const user1 = new ChatUser(chatRoom, 'Tanaka');
  const user2 = new ChatUser(chatRoom, 'Suzuki');
  const user3 = new ChatUser(chatRoom, 'Yamada');

  chatRoom.registerUser(user1);
  chatRoom.registerUser(user2);
  chatRoom.registerUser(user3);

  user1.send('こんにちは');
  user2.send('こんばんは');
}

main();
