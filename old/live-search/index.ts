import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { liveSearch, request } from './live-search';

const searchEL = document.querySelector('#search') as HTMLInputElement;
const containerEl = document.querySelector('.container') as HTMLDivElement;

liveSearch(
    fromEvent<InputEvent>(searchEL, 'input'),
    (str: string) => request(ajax(`https://api.github.com/search/repositories?q=${str}`))
).subscribe((resultStr: string) => {
    containerEl.innerHTML = resultStr;
})