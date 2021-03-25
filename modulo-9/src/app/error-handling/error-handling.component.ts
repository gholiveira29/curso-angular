import { catchError, map, retryWhen, tap } from 'rxjs/operators';
import { Observable, of, timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.css']
})
export class ErrorHandlingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  startTest() {
    let obj: Observable<any> = new Observable((observer) => {
      for(let i = 0; i <= 10; i++) {
        if(i == 7) {
          observer.error(`An errir accurred when i = ${i}`);
        }else {
          observer.next(i);
        }
      }
    });

    obj
    .pipe(
      map((i) => i*10),
      tap((i) => console.log('Before error handling: ' + i)),
      catchError((error) => {
        console.log(error);
        return of(0);
      }),
      retryWhen(i => timer(5000))
    )
  .subscribe(
    i => console.log(i),
    (error ) => console.log(error),
    () => console.log('completed')
  )
  }
}
