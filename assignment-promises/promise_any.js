//The Promise.any() returns a promise that is fulfilled with any first fulfilled promise 
//even if some promises in the iterable object are rejected:
//ignores the rejected promises 
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Promise 1 fulfilled');
      resolve(1);
    }, 1000);
  });
  
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Promise 2 fulfilled');
      resolve(2);
    }, 2000);
  });
  
  const p = Promise.any([p1, p2]);
  p.then((value) => {
    console.log('Returned Promise');
    console.log(value);
  });