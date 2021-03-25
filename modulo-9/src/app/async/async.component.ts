import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { map, toArray } from 'rxjs/operators';

interface User {
  login: string;
  name: string
}

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements OnInit {

  options$: Observable<string[]>; 
  user$: Observable<User>; 

  constructor() { }

  ngOnInit(): void {
    this.options$ = Observable.create((observer)=> {
      for(let i = 0; i <= 10; i++) {
        observer.next(`This is my ${i}th option`);
      }
      observer.complete();
    })
    .pipe(
      map(s=> s+ '!'),
      toArray()
    )

    // this.options$.subscribe((s) => console.log(s))
    this.user$ = new Observable<User>((observer) => {
      let names = ['Maria','Jose','João', 'Henrique','Ana'];
      let logins =['Maria10','Jose55','João13', 'Henrique29','Ana23'];
      let i = 0;
      setInterval(() =>{
        if ( i == 5) {
          observer.complete();
        } else {
          observer.next({login: logins[i], name: names[i]});
        }
        i++
      }, 2000) 
    })
    // this.user$.subscribe((resposta) => console.log(resposta));
  }



}
