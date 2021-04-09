import { interval, Observable, timer } from "rxjs";
import { pluck, map, concatAll, toArray, shareReplay, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

class UserService {
    private _uniqueNameSequence$: Observable<any>;

    public getNames() {
        // if (!this._uniqueNameSequence$) {
        //     this._uniqueNameSequence$ = ajax('https://jsonplaceholder.typicode.com/posts')
        //         .pipe(
        //             pluck('response'),
        //             concatAll(),
        //             map((post: any) => post.title),
        //             toArray(),
        //             shareReplay()
        //         )
        // }
        this._uniqueNameSequence$ = timer(0, 16000).pipe(
            switchMap(() => {
                return ajax('https://jsonplaceholder.typicode.com/posts')
                    .pipe(
                        pluck('response'),
                        concatAll(),
                        map((post: any) => post.title),
                        toArray(),
                        shareReplay()
                    )
            }),
            shareReplay()
        )
        return this._uniqueNameSequence$;
    }
}


export const userService = new UserService();