export {};

function logAndGetString(value: string) {
  console.log('return', value);
  return value;
}

class Base {
  constructor() {
    this.name = logAndGetString('base-name in constructor');
  }
  
  name = logAndGetString('base-name');
}

class DerivedClass extends Base {
  // name = logAndGetString('derived-name');
  
  constructor() {
    super();
    this.name = logAndGetString('derived-name in constructor');
  }
  
  name = logAndGetString('derived-name');
}

const derivedInstance = new DerivedClass();
console.log(derivedInstance);
