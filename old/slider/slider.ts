import { combineLatest, fromEvent, Observable } from "rxjs";
import { map, pluck, startWith, takeUntil, tap, withLatestFrom } from "rxjs/operators";

interface ISlider {
    element: HTMLElement,
    value: number
}

const quality = getValue(fromEvent($('#quality').slider(), 'change'))
const rating = getValue(fromEvent($('#rating').slider(), 'change'))
const actual = getValue(fromEvent($('#actual').slider(), 'change'))

const slidersValue$ = combineLatest([quality, rating, actual])
    .pipe(
        map(([quality, rating, actual]) => Math.round((quality + rating + actual) / 3 * 10)),
    );

fromEvent<MouseEvent>(document.querySelector('#send-result') as HTMLButtonElement, 'click')
    .pipe(
        withLatestFrom(slidersValue$)
    )
    .subscribe(([_, value]) => console.log(value + '%'));

function getValue(source$: Observable<any>) {
    return source$.pipe(
        map(({ delegateTarget: { previousElementSibling }, value: { newValue } }: any) => {
            return {
                element: previousElementSibling,
                value: newValue
            }
        }),
        tap(redrawSlider),
        pluck('value'),
        startWith(5)
    )
}

function redrawSlider(rangeData: ISlider) {
    const sliderTrack = rangeData.element.querySelector('.slider-track');
    const newValue = rangeData.value * 10;
    sliderTrack?.classList.remove('bad', 'warn', 'good');

    if (newValue < 40) {
        sliderTrack?.classList.add('bad');
        return;
    }
    if (newValue >= 40 && newValue < 70) {
        sliderTrack?.classList.add('warn');
        return;
    }
    if (newValue >= 70) {
        sliderTrack?.classList.add('good');
    }
}