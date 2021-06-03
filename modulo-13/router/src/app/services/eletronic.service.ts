import { map, delay } from 'rxjs/operators';
import { Eletronic } from './../models/eletronic';
import { BehaviorSubject, timer, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EletronicService {

  private electronicSubject$: BehaviorSubject<Eletronic[]> = new  BehaviorSubject<Eletronic[]>([]);
  public electronic$ = this. electronicSubject$.asObservable();

  constructor() {
    timer(1000)
      .subscribe(() => {
        this.electronicSubject$.next([
          {name: "Mouse wireless", brand: "Logitech", price: 50, description: "for Gamers"},
          {name:  "Processor i9", brand: "iNTEL", price: 1500, description: "132 mb cache"}
        ])
      })
  }
  get(i): Observable<Eletronic> {
    return this.electronic$.pipe(
      map(electronics => (i >= 0 && i < electronics.length) ? electronics[i] : null),
      delay(1000)
    )
  }
}
