import { interval, Observable, Subscriber } from "rxjs";

class SkipLimitSubscriber extends Subscriber<any> {
    // private _count = 1;
    // private _interval = 1;
    private _countSkip = 0;
    private _countLimit = 0;

    constructor(
        subscriber: Subscriber<any>,
        private _skip: number,
        private _limit: number
    ) {
        super(subscriber);
    }

    // next(value: any): void {
    //     const borderLeft = this._interval * (this._skip + this._limit) - this._limit;
    //     const borderRight = borderLeft + this._limit;

    //     if (borderLeft < this._count && this._count <= borderRight) {
    //         super.next(value);
    //         this._count++;
    //         if (borderRight < this._count) {
    //             this._interval++;
    //         }
    //         return;
    //     }
    //     this._count++;
    // }

    next(value: any): void {
        if (this._countSkip !== this._skip) {
            this._countSkip++;
            return;
        }
        if (this._limit === 0) {
            super.next(value);
            return;
        }
        if (this._countLimit !== this._limit) {
            this._countLimit++;
            super.next(value);
        } else {
            this._countSkip = 1;
            this._countLimit = 0;
        }
    }
}

export function skipLimit(skip: number, limit: number): (source$: Observable<any>) => Observable<any> {
    return (source$: Observable<any>): Observable<any> => {
        return source$.lift({
            call(subscriber: Subscriber<unknown>, source: any) {
                source.subscribe(new SkipLimitSubscriber(subscriber, skip, limit));
            }
        })
    }
}