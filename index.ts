
// const sequence = new Promise(resolved => {
//     let count = 0;
//     setInterval(() => resolved(count++), 1000);
// });

// sequence.then(value => console.log(value));
// sequence.then(value => console.log(value));

// const sequence = function* iteratorFn() {
//     let item = 0;
//     while (true) {
//         yield item++;
//     }
// }();

// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);
// console.log(sequence.next().value);


import { interval } from 'rxjs';

interval(1000).subscribe(v => console.log(v));
