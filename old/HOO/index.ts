import { fromEvent, interval, of } from "rxjs";
import { map, mergeAll, mergeMap, pluck, debounceTime } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

// interval(2000).pipe(
//     map(value => of(value))
// ).subscribe(observbable => observbable.subscribe(value => console.log(value))); // not good!

const inputEl = document.querySelector('input') as HTMLInputElement;

fromEvent(inputEl, 'input').pipe(
    mergeMap(event => {
        const value = (event.target as HTMLInputElement).value;
        return ajax(`https://api.github.com/search/repositories?q=${value}`)
    }, 2),
    // mergeMap = map + mergeAll, immediately combines
    // switchMap = map + switchAll, cancel the prevous stream
    // concatMap = map + concatAll, in order
    pluck('response')
).subscribe(value => console.log(value), (e) => console.log(e))

