import { combineLatest, from, of, queueScheduler, scheduled, Subject } from "rxjs";
import { asyncScheduler } from "rxjs/internal/scheduler/async";
import { asapScheduler } from "rxjs/internal/scheduler/asap";
import { map, observeOn, take } from "rxjs/operators";

// console.log('start');
// setTimeout(() => console.log('timeout 1'));
// setTimeout(() => console.log('timeout 2'));
// Promise.resolve().then(() => console.log('promise 1'));
// Promise.resolve().then(() => console.log('promise 2'));
// console.log('end');

// task1 ---- task2  ---- task3
// start     timeout 1   timeout 2
// end
// promise1
// promise 2

// micro - asap
// macro - async
// queue

// console.log('start');
// // of(1, 2, 3, 4, asap)
// //     .subscribe((v) => {
// //         console.log(v);
// //     });
// scheduled([1, 2, 3, 4], asyncScheduler)
//     .subscribe((v) => {
//         console.log(v);
//     });
// scheduled([11, 22, 33, 44], asapScheduler)
//     .subscribe((v) => {
//         console.log(v);
//     });
// console.log('end');

// const a$ = from([1, 2]); // output: 12
// const a$ = scheduled([1, 2], asapScheduler); // output: 11, 12
// const b$ = of(10);
// const c$ = combineLatest([a$, b$]).pipe(
//     map(([a, b]) => {
//         return a + b;
//     })
// );
// c$.subscribe(console.log);

const signal = new Subject<number>();
let count = 0;
const calc = ((count: number) => console.log('Do some calc: ', count));
console.log('Start');
signal.pipe(
    observeOn(queueScheduler), // solves Uncaught RangeError: Maximum call stack size exceeded
    take(1600)
)
    .subscribe((value: number) => {
        calc(value);
        signal.next(count++);
    })
signal.next(count++);
console.log('End');
