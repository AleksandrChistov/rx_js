import { fromEvent, Observable, zip, merge } from "rxjs";
import { map, tap } from "rxjs/operators";

const touchStartCoords$ = getX(fromEvent<TouchEvent>(document, 'touchstart'), fromEvent<MouseEvent>(document, 'mousedown'));
const touchEndCoords$ = getX(fromEvent<TouchEvent>(document, 'touchend'), fromEvent<MouseEvent>(document, 'mouseup'));

swipe(zip(touchStartCoords$, touchEndCoords$))
    .subscribe((value: number) => {
        if (value > 0) {
            console.log('Swipe to right!');
        } else {
            console.log('Swipe to left!');
        }
    });

export function getX(source1$: Observable<TouchEvent>, source2$: Observable<MouseEvent>): Observable<number> {
    return merge(source1$, source2$).pipe(
        map((event: TouchEvent | MouseEvent) => {
            if (event instanceof TouchEvent) {
                return event.changedTouches[0].clientX;
            } else {
                return event.clientX;
            }
        }),
    )
}

export function swipe(source$: Observable<number[]>): any {
    return source$.pipe(
        tap((v) => console.log(v)),
        map(coords => coords[1] - coords[0])
    )
}
