export {}

class Patient {
  constructor(public id: number, public name: string) {}
}

interface Iterator {
  hasNext(): boolean;
  next(): Patient | null;
}

interface Aggregate {
  getIterator(): Iterator;
}

class WaitingRoom implements Aggregate {
  private patients: Patient[] = [];

  getPatients(): Patient[] {
    return this.patients;
  }

  getCount(): number {
    return this.patients.length;
  }

  checkIn(patient: Patient): void {
    this.patients.push(patient);
  }

  getIterator(): Iterator {
    return new WaitingRoomIterator(this); // 直接依存してしまっており密結合 ここを改善したければFactoryパターンを使う
  }
}

class WaitingRoomIterator implements Iterator {
  private position: number = 0;

  constructor(private aggregate: WaitingRoom) {}

  hasNext(): boolean {
    return this.position < this.aggregate.getCount();
  }

  next(): Patient | null {
    if (this.hasNext()) {
      const patient: Patient = this.aggregate.getPatients()[this.position];
      this.position++;
      return patient;
    } else {
      console.log('患者がいません');
      return null;
    }
  }
}

function main(): void {
  const patient1 = new Patient(1, 'Tanaka');
  const patient2 = new Patient(2, 'Suzuki');
  
  const waitingRoom = new WaitingRoom();
  waitingRoom.checkIn(patient1);
  waitingRoom.checkIn(patient2);

  const iterator = new WaitingRoomIterator(waitingRoom);

  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
}

main();