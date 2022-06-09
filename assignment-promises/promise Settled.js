const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('The first promise has resolved');
        resolve(10);
    }, 1 * 1000);

});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('The second promise has rejected');
        reject(20);
    }, 2 * 1000);
});

Promise.allSettled([p1, p2])
    .then((result) => {
        console.log(result);
    });

    //The Promise.allSettled() method accepts an iterable of promises and returns a 
    //new promise that resolves when every input promise has settled with an array of objects 
    //that describes the result of each promise in the iterable object.