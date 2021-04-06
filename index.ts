
const sequence = new Promise(resolved => {
    let count = 0;
    setInterval(() => resolved(count++), 1000);
});

sequence.then(value => console.log(value));
sequence.then(value => console.log(value));