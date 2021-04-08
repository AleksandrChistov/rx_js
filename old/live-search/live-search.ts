import { fromEvent, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { debounceTime, map, pluck, filter, distinctUntilChanged, switchMap, concatAll, bufferCount, reduce } from "rxjs/operators";

interface IUser {
    name: string;
    description: string;
    owner: {
        avatar_url: string;
    }
}

export function liveSearch(source$: Observable<InputEvent>, request: (requestStr: string) => Observable<any>) {
    return source$.pipe(
        debounceTime(300),
        pluck<InputEvent, string>('target', 'value'),
        map((str: string) => str.trim()),
        filter((str: string) => str.length > 3),
        distinctUntilChanged(),
        switchMap(request)
    )
}

export function request(source$: Observable<any>) {
    return source$.pipe(
        pluck<any, IUser[]>('response', 'items'),
        concatAll(),
        map(createCard),
        bufferCount(3),
        reduce((resultString: string, htmlStrings: string[]) => {
            return resultString += createRow(htmlStrings)
        }, ''),
        map((resultString: string) => resultString.trim().replace(/\s+(<)/g, '<'))
    )
}

function createCard({ name, description, owner: { avatar_url } }: IUser) {
    return `
        <div class="col-md-4">
            <div class="card">
                <img class="card-img-top" src=${avatar_url} alt=${name}/>
                <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${description}</p>
                </div>
            </div>
        </div>
    `
}

export function createRow(htmlStrings: string[]) {
    return `
      <div class="row">
       ${htmlStrings.join(' ')}
      </div>
   `
}
