function bigTask(caller: string) {
  console.log(`${caller} loop start'`);
  for (let i = 0 ; i < 1e9 ; i++) {}
  console.log(`${caller} loop end'`);
}

function promiseBigTask() {
  return new Promise(resolve => {
    bigTask('Promise');
    resolve('');
  });
}

async function asyncBigTask() {
  bigTask('Async');
}

promiseBigTask().then();
asyncBigTask().then();
console.log('end');

/** expected
 * 'end'
 * 'Promise loop start'
 * 'Promise loop end'
 * 'Async loop start'
 * 'Async loop end'
 */

/** output
 * 'Promise loop start'
 * 'Promise loop end'
 * 'Async loop start'
 * 'Async loop end'
 * 'end'
 */
