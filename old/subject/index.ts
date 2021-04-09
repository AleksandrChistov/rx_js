import { AsyncSubject, Observable, Subject, Subscriber } from "rxjs";
import { ajax } from "rxjs/ajax";
import './component-1';
import './component-2';

// const sequence$$ = new Subject();

// sequence$$.next('Subject first');
// sequence$$.next('Subject second');
// sequence$$.subscribe(value => console.log(value));
// sequence$$.next('Subject start!');

// const sequence$$ = new AsyncSubject();

// sequence$$.subscribe(value => console.log(`Sub1: ${value}`));

// sequence$$.next('AsyncSubject: First');
// sequence$$.next('AsyncSubject: Second');
// sequence$$.next('AsyncSubject: Third');
// sequence$$.next('AsyncSubject: Fourth');


// setTimeout(() => {
//     sequence$$.complete();
//     sequence$$.subscribe(value => console.log(`Sub2: ${value}`));
// }, 3000)

function getItems(url: string) {
    let subject$$: AsyncSubject<any>;
    return new Observable((subscriber: any) => {
        if (!subject$$) {
            subject$$ = new AsyncSubject();
            ajax(url).subscribe(subject$$);
        }
        return subject$$.subscribe(subscriber);
    })
}

const items$ = getItems('https://api.github.com/search/repositories?q=AleksandrChistov');

items$.subscribe((value) => console.log('Sub1: ', value));

setTimeout(() => items$.subscribe((value) => console.log('Sub2: ', value)), 2000);