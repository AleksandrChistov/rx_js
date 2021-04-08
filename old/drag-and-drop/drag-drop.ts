import { Observable } from "rxjs";
import { concatMap, map, takeUntil } from "rxjs/operators";

export function drag(
    mousedown$: Observable<MouseEvent>,
    mousemove$: Observable<MouseEvent>,
    mouseup$: Observable<MouseEvent>
) {
    return mousedown$.pipe(
        concatMap(startEvent => {
            return mousemove$.pipe(
                map(moveEvent => {
                    return {
                        left: moveEvent.clientX - startEvent.offsetX,
                        top: moveEvent.clientY - startEvent.offsetY
                    }
                }),
                takeUntil(mouseup$)
            )
        })
    )
}