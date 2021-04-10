import { TestScheduler } from "rxjs/testing";
import { getX, swipe } from "./swipe";

function createTouchEvent(clientX: number) {
    return new TouchEvent('event', {
        changedTouches: [new Touch({ clientX, identifier: 1, target: new EventTarget() })]
    })
}

function createMouseEvent(clientX: number) {
    return new MouseEvent('event', { clientX });
}

describe('Swipe tests', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    })

    it('getX should transforms correctly', () => {
        testScheduler.run(({ hot, expectObservable }) => {
            const touch$ = hot('-a--b-----c-|', {
                a: createTouchEvent(2),
                b: createTouchEvent(4),
                c: createTouchEvent(31)
            });

            const mouseDown$ = hot('--------e---|', {
                e: createMouseEvent(5),
            });

            const sequence = '-a--b---e-c-|';
            expectObservable(
                getX(touch$, mouseDown$)
            ).toBe(sequence, { a: 2, b: 4, c: 31, e: 5 });
        })
    })


    it('swipe should calculates correctly', () => {
        testScheduler.run(({ hot, expectObservable }) => {
            const coords$ = hot('-a-b-|', {
                a: [2, 5],
                b: [119, 17],
            });

            const sequence = '-a-b-|';
            expectObservable(
                swipe(coords$)
            ).toBe(sequence, { a: 3, b: -102 });
        })
    })
})