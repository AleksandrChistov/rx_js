import { ConnectableObservable, interval, Subject, ReplaySubject } from "rxjs";
import { multicast, publish, refCount, share } from "rxjs/operators";

// const control = new Subject();
// const control = new ReplaySubject(2);
const sequence$ = interval(1000).pipe(
    // multicast(control)
    // publish(), // multicast(new Subject())
    // refCount() // позволяет автоматически начинать трансляцию потока - вместо connect()
    share()
) as ConnectableObservable<any>;

const sub1 = sequence$.subscribe((value) => {
    console.log('Sub1: ', value);
})

setTimeout(() => {
    sub1.unsubscribe();
}, 3000)

setTimeout(() => {
    sequence$.subscribe((value) => {
        console.log('Sub2: ', value);
    })
}, 5000)

setTimeout(() => {
    sequence$.subscribe((value) => {
        console.log('Sub3: ', value);
    })
}, 7000)

// Sub1:  0
// Sub1:  1
// Sub1:  2
// Sub2:  0
// Sub2:  1
// Sub3:  1
// Sub2:  2
// Sub3:  2
// Sub2:  3
// Sub3:  3
// Sub2:  4
// Sub3:  4
// ...
