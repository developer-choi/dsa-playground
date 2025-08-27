export class Singleton {
  private static INSTANCE: Singleton = new Singleton()

  constructor() {
    return Singleton.INSTANCE
  }

  static getInstance() {
    return Singleton.INSTANCE
  }
}

//@ts-ignore
console.log(Singleton.INSTANCE); //필요하지도않은데 이미 객체가 생성되어있음.
