const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('The first promise has resolved');
      resolve(10);
    }, 1 * 1000);
  });
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('The second promise has resolved');
      resolve(50);//tested
    }, 2 * 1000);
  });
  const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('The third promise has reject');
      reject(30);
    }, 3 * 1000);
  });
  
  Promise.all([p1, p2, p3]).then((results) => {
    const total = results.reduce((p, c) => p + c);
    console.log(`Results: ${results}`);
    console.log(`Total: ${total}`);
  }).catch((error)=>{
      console.log(error)

  })

  //The Promise.all() method accepts a list of promises and returns a new promsie 
  //that resolve to an array of results of the input promises if all the input promises resolved; or reject with an error of the first rejected promise.
//Use the Promise.all() method to aggregate results from multiple asynchronous operations.