Promise.resolve().then(() => console.log('then1'));
main();
console.log('end');
loop();
Promise.resolve().then(() => console.log('then2'));

function loop() {
  console.log('loop start');
  for (let i = 0 ; i < 1e10 ; i++) {}
  console.log('loop end');
}

function promiseTimeout(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
}

async function api1() {
  console.log('api1 call');
  await promiseTimeout(1000);
  console.log('api1 end');
  return 1;
}

async function api2() {
  console.log('api2 call');
  await promiseTimeout(2000);
  console.log('api2 end');
  return 2;
}

async function main() {
  const data1 = await api1();
  const data2 = await api2();
  console.log('result', data1 + data2);
}
