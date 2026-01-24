export {}

class Computer {
  type: string | undefined;
  cpu: string | undefined;
  ram: number | undefined;
}

interface ComputerBuilder {
  addCpu(cpu: string): void;
  addRam(ram: number): void;
}

class DesktopBuilder implements ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
    this.computer.type = 'Desktop';
  }

  addCpu(cpu: string): void {
    this.computer.cpu = cpu;
  }

  addRam(ram: number): void {
    this.computer.ram = ram;
  }

  getResult(): Computer {
    return this.computer;
  }
}

class LaptopBuilder implements ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
    this.computer.type = 'Laptop';
  }

  addCpu(cpu: string): void {
    this.computer.cpu = cpu;
  }

  addRam(ram: number): void {
    this.computer.ram = ram;
  }

  getResult(): Computer {
    return this.computer;
  }
}

class Director {
  constructor(private builder: ComputerBuilder) {}

  construct(): void {
    this.builder.addCpu('Core-i5');
    this.builder.addRam(8);
  }

  highSpecConstruct(): void {
    this.builder.addCpu('Core-i9');
    this.builder.addRam(32);
  }
}

function main(): void {
  const desktopBuilder = new DesktopBuilder();
  const laptopBuilder = new LaptopBuilder();

  const desktopDirector = new Director(desktopBuilder);
  const laptopDirector = new Director(laptopBuilder);

  desktopDirector.highSpecConstruct();
  laptopDirector.construct();

  console.log(desktopBuilder.getResult());
  console.log(laptopBuilder.getResult());
}

main();