import { EMPTY, interval, of, zip } from "rxjs";
import { catchError, map, retry, switchMap, tap } from "rxjs/operators";

const sequence1$ = interval(1000);
const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');

const sequence$ = zip(sequence1$, sequence2$);

sequence$.pipe(
    // map(([x, y]: [number, number | string]) => {
    //     // try {
    //     //     return (y as any).toLowerCase();
    //     // } catch (error) {
    //     //     console.log(error);
    //     //     return '0';
    //     // }
    //     return (y as any).toLowerCase();
    // }),
    switchMap(([x, y]: [number, number | string]) => {
        return of(y).pipe(
            map(y => {
                return (y as any).toLowerCase();
            }),
            catchError((error) => {
                console.log('Catch error: ', error);
                return EMPTY;
            }),
        )
    }),
    // tap(value => console.log(value)),
    retry(3),
    // catchError((error) => {
    //     console.log('Catch error: ', error);
    //     // return of('0');
    //     return EMPTY;
    // }),
    // catchError((error, source$) => {
    //     console.log('Catch error: ', error);
    //     return source$;
    // }),
    // tap(value => console.log('After catch error: ', value)),
).subscribe(
    value => console.log(value),
    error => console.log(error),
    () => console.log('Comleted!')
)


// const pingEpic = action$ => action$.pipe(
//     filter(action => action.type === 'LOGIN'),
//     switchMap((user)=> service.login(user)),
//     catchError(()=>EMPTY) // error completed the whole stream, not good!
// );
// it is better!
// const pingEpic = action$ => action$.pipe(
//     filter(action => action.type === 'LOGIN'),
//     switchMap((user)=> service.login(user)
//         .pipe(
//             mergeMap(()=> [JWTLocalStorage, SetUser, LoginSuccess, GO]),
//             catchError(()=>EMPTY)
//         )
//     ),
// );
