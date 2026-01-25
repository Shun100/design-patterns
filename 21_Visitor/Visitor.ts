export {}

// データ構造
abstract class Entry {
  constructor(private code: string, private name: string) {}

  getCode(): string {
    return this.code;
  }

  getName(): string {
    return this.name;
  }

  abstract getChildren(): Entry[];
  abstract accept(visitor: Visitor): void;
}

class Group extends Entry {
  private children: Entry[] = [];

  add(entry: Entry): void {
    this.children.push(entry);
  }

  getChildren(): Entry[] {
    return this.children;
  }

  accept(visitor: Visitor): void {
    visitor.visit(this); // Visitor.visit()と互いに呼び合う
  }
}

class Employee extends Entry {
  getChildren(): Entry[] {
    return [];
  }

  accept(visitor: Visitor): void {
    visitor.visit(this); // Visitor.visit()と互いに呼び合う
  }
}

// 処理
interface Visitor {
  visit(entry: Entry): void;
}

class ListVisitor implements Visitor {
  visit(entry: Entry): void {
    console.log(`code: ${entry.getCode()}, name: ${entry.getName()}`);
    entry.getChildren().forEach(child => child.accept(this)); // Entry.acceptと互いに呼び合う 結果、階層が深いツリー構造でも再帰的に操作を実行できる
  }
}

class CountVisitor implements Visitor {
  private groupCount: number = 0;
  private employeeCount: number = 0;

  visit(entry: Entry): void {
    if (entry instanceof Group) {
      this.groupCount++;
    } else if (entry instanceof Employee) {
      this.employeeCount++;
    }
    entry.getChildren().forEach(child => child.accept(this)); // Entry.acceptと互いに呼び合う 結果、階層が深いツリー構造でも再帰的に操作を実行できる
  }

  getGroupCount(): number {
    return this.groupCount;
  }

  getEmployeeCount(): number {
    return this.employeeCount;
  }
}

function main(): void {
  const hq = new Group('01', '本社');
  hq.add(new Employee('0101', '社長'));
  hq.add(new Employee('0102', '副社長'));

  const branch = new Group('10', '神奈川支部');
  branch.add(new Employee('1001', '支部長'));

  const department = new Group('11', '横浜営業所');
  department.add(new Employee('1101', '営業部長'));
  department.add(new Employee('1102', '営業課長'));

  branch.add(department);
  hq.add(branch);

  const listVisitor = new ListVisitor();
  const countVisitor = new CountVisitor();

  hq.accept(listVisitor);
  hq.accept(countVisitor);

  console.log(`社員数: ${countVisitor.getEmployeeCount()}`);
  console.log(`グループ数: ${countVisitor.getGroupCount()}`);
}

main();
