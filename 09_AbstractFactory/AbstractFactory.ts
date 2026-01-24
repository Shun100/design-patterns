export {}

interface CheckBox {
  switch(): void;
}

interface Button {
  press(): void;
}

interface GUIFactory {
  createButton(): Button;
  createChecBox(): CheckBox;
}

class WindowsCheckBox implements CheckBox {
  switch(): void {
    console.log('Windows: チェックボックス切替');
  }
}

class WindowsButton implements Button {
  press(): void {
    console.log('Windows: ボタン押下');
  }
}

class WindowsGUIFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }

  createChecBox(): CheckBox {
    return new WindowsCheckBox();
  }
}

class MacCheckBox implements CheckBox {
  switch(): void {
    console.log('Mac: チェックボックス切替');
  }
}

class MacButton implements Button {
  press(): void {
    console.log('Mac: ボタン押下');
  }
}

class MacGUIFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }

  createChecBox(): CheckBox {
    return new MacCheckBox();
  }
}

function main(): void {
  const windowsGUIFactory = new WindowsGUIFactory();
  const macGUIFactory = new MacGUIFactory();

  windowsGUIFactory.createButton().press();
  windowsGUIFactory.createChecBox().switch();

  macGUIFactory.createButton().press();
  macGUIFactory.createChecBox().switch();
}

main();