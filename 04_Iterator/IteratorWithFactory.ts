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

interface IteratorFactory {
  create(aggregate: Aggregate): Iterator;
}

class WaitingRoom implements Aggregate {
  private patients: Patient[] = [];

  constructor(private iteratorFactory: IteratorFactory) {}

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
    return this.iteratorFactory.create(this); // 疎結合化
  }
}

class WaitingRoomIteratorFactory implements IteratorFactory {
  create(aggregate: Aggregate): Iterator {
    return new WaitingRoomIterator(aggregate as WaitingRoom);
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
  
  const waitingRoom = new WaitingRoom(new WaitingRoomIteratorFactory());
  waitingRoom.checkIn(patient1);
  waitingRoom.checkIn(patient2);

  const iterator = new WaitingRoomIterator(waitingRoom);

  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
}

main();