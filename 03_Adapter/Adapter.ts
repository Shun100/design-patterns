export {}

interface Target {
  getCsvData(): string;
}

class JsonToCsvAdapter implements Target {
  constructor(private adaptee: NewLibrary) {}

  getCsvData(): string {
    type JsonData = { data1: string, data2: string};

    const jsonData: JsonData[] = this.adaptee.getJsonData();
    const header = Object.keys(jsonData[0]).join(',') + '\n';
    const body = jsonData.map(d => 
      (Object.keys(d) as (keyof JsonData)[])
        .map(key => d[key])
        .join(',')
      )
      .join('\n');

    return header + body;
  }
}

class NewLibrary {
  getJsonData(): { data1: string; data2: string }[] {
    return [
      {
        data1: 'json_dataA',
        data2: 'json_dataB',
      },
      {
        data1: 'json_dataC',
        data2: 'json_dataD',
      }
    ]
  }
}

function main(): void {
  const adaptee = new NewLibrary();
  console.log('=== Adpateeが提供するデータ ===');
  console.log(adaptee.getJsonData());

  const Adapter = new JsonToCsvAdapter(adaptee);
  console.log('=== Adapterが提供するデータ ===');
  console.log(Adapter.getCsvData());
}

main();
