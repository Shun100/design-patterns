export {}

interface Server {
  handle(userId: string): void;
}

class RealServer implements Server {
  handle(userId: string): void {
    console.log(`ユーザ: ${userId} の処理を行います`);
  }
}

class Proxy implements Server {
  private authorizedUsers: string[] = ['u001', 'u002', 'u003'];

  constructor(private realServer: Server) {}

  private authorize(userId: string): boolean {
    return this.authorizedUsers.some(uid => uid === userId); // ES2016以降: this.authorizedUsers.includes(userId);
  }

  handle(userId: string): void {
    if (this.authorize(userId)) {
      console.log(`ユーザ: ${userId} は認証されています`);
      this.realServer.handle(userId);
    } else {
      throw new Error(`ユーザ: ${userId} は認証されていません`);
    }
  }
}

function main(): void {
  const realServer = new RealServer();
  const proxy = new Proxy(realServer);

  proxy.handle('u001');

  proxy.handle('u004');
}

main();
