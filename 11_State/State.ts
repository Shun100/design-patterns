export {}

interface UserState {
  isAuthenticated(): boolean;
  displayPage(): void;
  nextState(): UserState;
}

class AuthenticatedState implements UserState {
  isAuthenticated(): boolean {
    return true;
  }

  displayPage(): void {
    console.log('ユーザページを表示');
  }

  nextState(): UserState {
    return new UnAuthenticatedState();
  }
}

class UnAuthenticatedState implements UserState {
  isAuthenticated(): boolean {
    return false;
  }

  displayPage(): void {
    console.log('権限がありません');
  }

  nextState(): UserState {
    return new AuthenticatedState();
  }
}

class User {
  constructor(private state: UserState) {}

  isAuthenticated(): boolean {
    return this.state.isAuthenticated();
  }

  displayPage(): void {
    this.state.displayPage();
  }

  switchState(): void {
    this.state = this.state.nextState();
  }
}

function main(): void {
  const initialUserState = new UnAuthenticatedState();
  const context = new User(initialUserState);

  console.log(context.isAuthenticated());
  context.displayPage();
  
  context.switchState();

  console.log(context.isAuthenticated());
  context.displayPage();
}

main();