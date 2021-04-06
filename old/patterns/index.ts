// ReactiveX = iterator + observer + FP
// 1-----2-----3-----4-----5

class CustomIterator {
    private _cursor = 0;
    private _value: number;

    constructor(private _arr: number[], private _divisor = 1) { }

    public next() {
        while (this._cursor < this._arr.length) {
            this._value = this._arr[this._cursor++];
            if (this._value % this._divisor === 0) {
                return { done: false, value: this._value };
            }
        }
        return { done: true };
    }

    [Symbol.iterator]() {
        this._cursor = 0;

        return {
            next: this.next.bind(this)
        }
    }
}

const customIterator = new CustomIterator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3);

// console.log(customIterator.next());
// console.log(customIterator.next());
// console.log(customIterator.next());
// console.log(customIterator.next());
// console.log(customIterator.next());

// for (let item of customIterator) {
//     console.log(item);
// }

// Array.from(customIterator).forEach(item => {
//     console.log(item);
// })

console.log(...customIterator); // 3 6 9

// observer

interface Listener {
    next(message: string): void;
}

class Producer {
    private _listeners: Listener[] = [];

    public subscribe(listener: Listener) {
        const index = this._listeners.push(listener);

        return {
            unsubscribe: () => {
                this._listeners.splice(index - 1, 1);
            }
        }
    }

    public notify(message: string) {
        this._listeners.forEach(listener => listener.next(message));
    }
}

const listener1 = {
    next(message: string) {
        console.log('Listener1: ', message);
    }
}

const listener2 = {
    next(message: string) {
        console.log('Listener2: ', message);
    }
}

const notifier = new Producer();

const sub1 = notifier.subscribe(listener1);
const sub2 = notifier.subscribe(listener2);

notifier.notify('Hi there! We are learning RxJS.');

sub1.unsubscribe();

setTimeout(() => notifier.notify('Hi after unsubscription!'), 3000);
