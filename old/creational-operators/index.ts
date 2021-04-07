import { of, from, iif, defer } from "rxjs";
import { take, map, tap, pluck, switchMap } from "rxjs/operators";
import { ajax } from 'rxjs/ajax';
import { ajaxGetJSON } from "rxjs/internal/observable/dom/AjaxObservable";

// finite and cold stream
// const sequence$ = of(1, 2, 3, 4);

// sequence$.subscribe((value: number) => console.log(value));
// setTimeout(() => sequence$.subscribe((value: number) => console.log(value)), 2000);

// ----------------------

// const sequence$ = from(
//     fetch('https://jsonplaceholder.typicode.com/posts')
//         .then((response) => response.json())
// ).pipe(switchMap((json) => from(json)), take(10), pluck('id'));

// sequence$.subscribe((value: any) => console.log(value));

// const sequence$ = ajax('https://jsonplaceholder.typicode.com/posts')
//     .pipe(switchMap((ajax) => from(ajax.response)), take(10), pluck('id'));

// const sequence$ = ajaxGetJSON('https://jsonplaceholder.typicode.com/posts')
//     .pipe(switchMap((response: any) => from(response)), take(10), pluck('id'));

// sequence$.subscribe((value: any) => console.log(value));

// -------------------- if else

// const nRandom = Math.round(Math.random() * 10);

// const rNumber = iif(() => nRandom < 5, of('Random number < 5'), of('Random number > 5'));

// rNumber.subscribe((value: string) => console.log(value));

// const rNumber = defer(() => {
//     return nRandom > 5
//         ? nRandom < 8
//             ? of('Random number > 5 and < 8')
//             : of('Random number > 7')
//         : of('Random number < 6')
// })

// rNumber.subscribe((value: string) => console.log(value));

// ------------------------------------------------

import fs from 'fs';
import util from 'util';
import path from 'path';

const promisifiedReadFile = util.promisify(fs.readFile);

const readdir$ = from(promisifiedReadFile(path.resolve(__dirname, 'text'))).pipe(
    map((buffer: Buffer) => {
        const str = buffer.toString();
        console.log('String from text file: ', str);
        const regexp = />([\w]+)</;
        const matches = regexp.exec(str);

        return matches && matches[1];
    })
)

readdir$.subscribe(value => console.log(value));
