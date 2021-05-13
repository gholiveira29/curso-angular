import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Dvd } from '../models/dvd';

@Injectable({
  providedIn: 'root'
})
export class DvdService {

  private dvdSubject$: BehaviorSubject<Dvd[]> = new  BehaviorSubject<Dvd[]>([]);
  public dvds$ = this. dvdSubject$.asObservable();

  constructor() {
    timer(2000)
    .subscribe(() => {
      this.dvdSubject$.next([
        {title: "DVD - Beegees", year: 2016, genre: 'Music'},
        {title: "Harry Potter", year: 2010, genre: 'Film'},
        {title: "Jogos Vorazes", year: 2012, genre: 'Film'},
        {title: "Em chamas", year: 2015, genre: 'Film'},
        {title: "A esperança", year: 2020,  genre: 'Film'},
      ])
    })
  }


  add(b: Dvd) {
    this.dvdSubject$.getValue().push(b);
  }

  remove(i: number) {
    let dvds = this.dvdSubject$.getValue();

    if(i >= 0 &&  i < dvds.length) {
      dvds.splice(i,1);
    }
  }

  get(i): Observable<Dvd> {
    return this.dvds$.pipe(
      map(dvds => (i >= 0 && i < dvds.length) ? dvds[i] : null),
      delay(1000)
    )
  }
}
