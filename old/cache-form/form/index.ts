import { combineLatest, ConnectableObservable, EMPTY, fromEvent, Observable, of } from "rxjs";
import { debounceTime, pluck, switchMap, withLatestFrom } from "rxjs/operators";
import { userService } from "./user.service";

export class CreateForm {
    public valueSequence$: Observable<any>;

    private _input: HTMLInputElement;
    private _saveButton: HTMLButtonElement;

    public constructor(public formContainer: HTMLFormElement) {
        this._input = formContainer.querySelector('input') as HTMLInputElement;
        this._saveButton = formContainer.querySelector('button') as HTMLButtonElement;

        this.valueSequence$ = combineLatest(
            fromEvent(this._input, 'input').pipe(pluck('target', 'value')),
            userService.getNames()
        ).pipe(
            debounceTime(300),
            switchMap(([value, names]: any) => {
                console.log(names);
                const isNotValid = names.find((name: string) => name === value);
                if (isNotValid) {
                    this._input.classList.add('error');
                    this._saveButton.disabled = true;
                    return EMPTY;
                }
                this._input.classList.remove('error');
                this._saveButton.disabled = false;
                return of(value);
            })
        )

        fromEvent(this._saveButton, 'click').pipe(
            withLatestFrom(this.valueSequence$)
        ).subscribe(value => {
            console.log(value)
        })
    }
}