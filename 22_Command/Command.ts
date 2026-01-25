export {}

// Receiver
class File {
  constructor(private name: string) {}

  open(): void {
    console.log(`${this.name}を開きました`);
  }

  compress(): void {
    console.log(`${this.name}を圧縮しました`);
  }

  close(): void {
    console.log(`${this.name}を閉じました`);
  }
}

interface Command {
  execute(): void;
}

class OpenCommand implements Command {
  constructor(private file: File) {}

  execute(): void {
    this.file.open();
  }
}

class CompressCommand implements Command {
  constructor(private file: File) {}

  execute(): void {
    this.file.compress();
  }
}

class CloseCommand implements Command {
  constructor(private file: File) {}

  execute(): void {
    this.file.close();
  }
}

// Invoker
class Queue {
  private commands: Command[] = [];

  addCommand(command: Command): void {
    this.commands.push(command);
  }

  executeCommand(): void {
    this.commands.forEach(command => command.execute());
  }
}

function main(): void {
  const queue = new Queue();

  const file = new File('icon.svg');
  const openCommand = new OpenCommand(file);
  const compressCommand = new CompressCommand(file);
  const closeCommand = new CloseCommand(file);

  queue.addCommand(openCommand);
  queue.addCommand(compressCommand);
  queue.addCommand(closeCommand);

  queue.executeCommand();
}

main();
