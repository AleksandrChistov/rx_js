import { animationFrameScheduler, defer, interval, noop } from "rxjs";
import { map, takeWhile, tap } from "rxjs/operators";

const divElement = document.querySelector('div') as HTMLDivElement;

// interval(0, animationFrameScheduler).pipe(
//     map((x: number) => {
//         divElement.style.transform = `translate3d(0,${x}px,0)`;
//     })
// ).subscribe();

// css animation is better!
function msElapsed(scheduler = animationFrameScheduler) {
    return defer(() => {
        const start = scheduler.now(); // start is cached
        return interval(0, scheduler).pipe(
            map(_ => scheduler.now() - start)
        )
    })
}

function duration(ms: number, scheduler = animationFrameScheduler) {
    return msElapsed(scheduler).pipe(
        map((time: number) => {
            return time / ms;
        }),
        takeWhile((percentage: number) => percentage <= 1)
    )
}

function distance(px: number) {
    return (percentage: number) => percentage * px;
}

const animationFn = (percentage: number) => {
    return Math.sin(-13 * (percentage + 1) * Math.PI * 2) * Math.pow(2, -10 * percentage) + 1;
}

function animationDown(divElement: HTMLDivElement) {
    return duration(20000).pipe(
        map(animationFn),
        map(distance(100)),
        tap((frame: number) => {
            divElement.style.transform = `translate3d(0,${frame}px,0)`;
        })
    )
}

animationDown(divElement).subscribe(
    noop,
    noop,
    () => console.log('Animation completed!')
)
