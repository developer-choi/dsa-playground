export {};

class Base {
  baseField = 3;
}

class Derived extends Base {
  constructor() {
    super();
  }
  
  print() {
    /**
     * TS2340: Only public and protected methods of the base class are accessible via the 'super' keyword.
     * https://stackoverflow.com/a/51833890
     * https://github.com/Microsoft/TypeScript/issues/338
     * I don't know what's the difference super.baseField vs this.baseField.
     */
    //@ts-ignore
    console.log(super.baseField);
  }
}

const derived = new Derived();
derived.print();
