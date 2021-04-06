import { interval, noop, Observable } from "rxjs";

const sequence$ = new Observable((subscriber) => {
    let count = 0;
    const intervalId = setInterval(() => {
        if (count !== 0 && count % 5 === 0) {
            clearInterval(intervalId);
            subscriber.complete();
            return;
        }
        subscriber.next(count++);
    }, 1000);

    return {
        unsubscribe: () => {
            console.log('Unsubscribed');
            clearInterval(intervalId);
        }
    }
});

const sub = sequence$.subscribe(
    (value) => console.log(value),
    noop,
    () => console.log('Completed stream!')
);

setTimeout(() => sub.unsubscribe(), 3000);

// -----------------------------------

const sequence2$ = interval(1000);

const sub1 = sequence2$.subscribe((value: number) => console.log('Sub1: ', value));
const sub2 = sequence2$.subscribe((value: number) => console.log('Sub2: ', value));

setTimeout(() => sub1.unsubscribe(), 3000);