export {}

// 実装のAPI
interface MessageApp {
  send(): void;
}

class LINE implements MessageApp {
  send(): void {
    console.log('LINEでメッセージ送信');
  }
}

class Twitter implements MessageApp {
  send(): void {
    console.log('Twitterでメッセージ送信');
  }
}

class Facebook implements MessageApp {
  send(): void {
    console.log('Facebookでメッセージ送信');
  }
}

// 機能のAPI
abstract class OS {
  protected app: MessageApp | null = null;

  setApp(app: MessageApp): void {
    this.app = app;
  }

  abstract sendMessage(): void;
}

class IOS extends OS {
  sendMessage(): void {
    console.log('IOSでメッセージ送信');
    this.app?.send();
  }
}

class Android extends OS {
  sendMessage(): void {
    console.log('Androidでメッセージ送信');
    this.app?.send();
  }
}

function main(): void {
  // 機能 クライアントが理解したい概念・操作 = スマホからメッセージを送信したい
  const ios = new IOS();
  const android = new Android();

  // 実装 実現方法 = メッセージアプリ
  const line = new LINE();
  const twitter = new Twitter();
  const facebook = new Facebook();

  // 機能と実装の組み合わせを動的に変えられる
  ios.setApp(line);
  ios.sendMessage();

  android.setApp(facebook);
  android.sendMessage();
}

main();
