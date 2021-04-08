import { interval, Observable, noop, Subscriber } from "rxjs";
import { filter } from "rxjs/operators";
import { skipLimit } from "./skip-limit";

function doNothing(source$: Observable<any>) {
    return source$;
}

function toText(source$: Observable<any>) {
    return new Observable(subscriber => {
        subscriber.next('RxJS is awesome!');
        subscriber.complete();
    })
}

class DoubleSubscriber extends Subscriber<number> {
    next(value: number): void {
        super.next(value * 2);
    }
}

function double(source$: Observable<any>) {
    return source$.lift({
        call(subscriber: Subscriber<number>, source: any): void {
            source.subscribe(new DoubleSubscriber(subscriber));
        }
    })
    // const o$ = new Observable();
    // o$.source = source$;
    // o$.operator = {
    //     call(subscriber: Subscriber<number>, source: any): void {
    //         source.subscribe(new DoubleSubscriber(subscriber));
    //     }
    // }
    // return o$;
}

// const pipe = (...fns: Function[]) => (source: Observable<any>): Observable<any> => fns.reduce(
//     (newSource, fn) => fn(newSource), source
// )

// const filterWithDouble = pipe(
//     filter((value: number) => value % 3 === 0),
//     double
// )

// interval(1000)
//     .pipe(
//         filterWithDouble
//     )
//     .subscribe(value => console.log(value), noop, () => console.log('Completed'));

interval(1000).pipe(
    skipLimit(2, 1)
).subscribe((value: number) => console.log(value))