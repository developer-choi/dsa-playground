export default class HashTable {
  private readonly array: (string | undefined)[];

  constructor() {
    this.array = [];
  }

  // 넣, 얻, 탐, 삭 전부 O(1)임. 비결은 map function으로 저장된 인덱스에 버로 접근할 수 있으니까.
  set(key: string, value: string) {
    this.array[hashFunction(key)] = value;
  }

  get(key: string): string | undefined {
    return this.array[hashFunction(key)];
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: string): string | undefined {
    const data = this.get(key);
    this.array[hashFunction(key)] = undefined;
    return data;
  }
}

function hashFunction(key: string): number {
  return key.length;
}

const table = new HashTable();
table.set('a', 'apple');
table.set('ba', 'banana');
table.set('kiw', 'kiwi');

console.log(table.get('a'));
console.log(table.get('ba'));
console.log(table.get('kiw'));
console.log(table.has('ba'));
console.log(table.has('abcdefg'));
console.log(table.delete('a'));
console.log(String(table.get('a')));
