// https://javascript.info/microtask-queue#unhandled-rejection
const promise = Promise.reject(new Error("Promise Failed!"));

// Don't handled!
setTimeout(() => promise.catch(() => alert('caught')), 1000);

// Handled.
// promise.catch(() => console.log('Catch an error'));
