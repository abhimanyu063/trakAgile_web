import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class HeaderService {
    private headerVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    get isHeaderVisible() {
        return this.headerVisible.asObservable();
    }
    setHeaderVisibility(value:boolean)
    {
        this.headerVisible.next(value);
    }
}