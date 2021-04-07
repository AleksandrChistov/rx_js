import { fromEvent, interval } from "rxjs";
import { map, tap, filter, skip, take, debounceTime, pluck } from "rxjs/operators";

// const sequence$ = interval(1000);

// 0---1---2---3---4---5---...
// tap((n) => return [11, 22, 33, 44]) - for side affects
// filter((n)=>n%2===0)
// 0-------2-------4-------...
// map((n)=>n**2)
// 0-------4-------16------...
// skip(2)
// ----------------16------...
// take(1)
// ----------------16------


// sequence$.pipe(
//     tap((n: number) => [11, 22, 33, 44]),
//     filter((n: number) => n % 2 === 0),
//     map((n: number) => n ** 2),
//     skip(2),
//     take(1)
// ).subscribe((result: number) => console.log(result));


// -------------------------

const inputEl = document.querySelector('input') as HTMLInputElement;

fromEvent(inputEl, 'input').pipe(
    debounceTime(300),
    pluck<Event, string>('target', 'value')
).subscribe((value: string) => console.log(value));