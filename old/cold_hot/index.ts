import { Observable } from "rxjs";

const websoket = new WebSocket('wss://echo.websocket.org');

const sequence$ = new Observable((subscriber) => {
    websoket.addEventListener('message', (value) => subscriber.next(value));
})

websoket.addEventListener('open', () => {
    let count = 0;
    setInterval(() => websoket.send((count++).toString()), 1000);
})

const sub1 = sequence$.subscribe((value: any) => console.log('Sub1: ', value.data));

setTimeout(() => {
    const sub2 = sequence$.subscribe((value: any) => console.log('Sub2: ', value.data));
}, 3000);
