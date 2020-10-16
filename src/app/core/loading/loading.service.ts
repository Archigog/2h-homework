import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  public start() {
    this.isLoading$.next(true);
  }

  public stop() {
    this.isLoading$.next(false);
  }

}
