import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";

class DataService {
    // private _controlSequence = new BehaviorSubject({});
    private _controlSequence = new ReplaySubject();

    public getData() {
        return this._controlSequence.asObservable();
    }

    public setData(data: any) {
        this._controlSequence.next(data);
    }
}

export const instance = new DataService();

