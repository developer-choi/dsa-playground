export {};

test();

function timeout(time: number, future: 'fulfilled' | 'rejected') {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      if (future === 'fulfilled') {
        resolve(time);

      } else {
        reject(time);
      }

    }, time);
  });
}

async function allSettled<T>(promises: Promise<T>[]) {
  const array = [];

  for(const promise of promises) {
    try {
      const value = await promise;
      console.log('value', value);

      array.push({
        status: 'fulfilled',
        value
      });

    } catch (error) {
      console.log('reason', error);

      array.push({
        status: 'rejected',
        reason: error
      });
    }
  }

  return array;
}

//Why occurred UnhandledPromiseRejection?
async function test() {
  try {
    const fp1 = timeout(1000, 'fulfilled');
    const rp1 = timeout(1000, 'rejected');

    const fp2 = timeout(100, 'fulfilled');
    const rp2 = timeout(100, 'rejected');

    // console.log(await Promise.allSettled([fp1, rp1, fp2, rp2]));
    console.log(await allSettled([fp1, rp1, fp2, rp2]));
  } catch (error) {
    console.log('main error', error);
  }
}
