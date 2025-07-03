class SynchronizedSingleton {
  private static INSTANCE: SynchronizedSingleton

  constructor() {
    if(!SynchronizedSingleton.INSTANCE) {
      SynchronizedSingleton.INSTANCE = this
    }

    return SynchronizedSingleton.INSTANCE;
  }
}

function timeoutPromise(timeout: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

class AsynchronizedSingleton {
  private static INSTANCE: AsynchronizedSingleton | undefined;
  private static isLocked = false;

  private constructor() {
    console.log('instance created');
  }
  static async getInstance(): Promise<AsynchronizedSingleton> {
    while (AsynchronizedSingleton.isLocked) {
      await timeoutPromise(100);
    }

    if (AsynchronizedSingleton.INSTANCE) {
      return AsynchronizedSingleton.INSTANCE;
    }

    console.log('Creating new instance...');
    AsynchronizedSingleton.isLocked = true;
    await timeoutPromise(1000);
    AsynchronizedSingleton.INSTANCE = new AsynchronizedSingleton();
    AsynchronizedSingleton.isLocked = false;
    return AsynchronizedSingleton.INSTANCE;
  }
}

Promise.all([
  new SynchronizedSingleton(),
  new SynchronizedSingleton(),
]).then((instances) => {
  console.log("Are instances equal?", instances[0] === instances[1]);
});

Promise.all([
  AsynchronizedSingleton.getInstance(),
  AsynchronizedSingleton.getInstance(),
]).then((instances) => {
  console.log("Are instances equal?", instances[0] === instances[1]);
});
