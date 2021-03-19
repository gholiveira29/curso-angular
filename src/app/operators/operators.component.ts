import { Component, OnInit } from '@angular/core';
import { from , fromEvent,  interval, Observable, Subscription } from 'rxjs';
import { delay, filter, first, last, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  mapClick() {
    from([1,2,3,4,5,6,7,8,9,10])
    .pipe(
      map(i => "number: " + i),
      delay(1000)
    )
    .subscribe((value) => console.log(value));

    fromEvent(document, 'click')
    .pipe(
      map((e: MouseEvent) => ({x: e.screenX, y: e.screenY}))
    )
    .subscribe((pos) => console.log(pos));
  }

  filterClick() {
    from([1,2,3,4,5,6,7,8,9,])
    .pipe(
      filter(i => i%2 == 1)
    )
    .subscribe((i) => console.log(i));

    interval(1000)
    .pipe(
      filter(i => i%2 == 0),
      map(i => 'value: ' + i),
      delay(1000)
    )
    .subscribe((i) => console.log(i));
  }

  tapClick() {
    
    interval(1000)
    .pipe(
      tap(i => console.log('antes do filter', i)),
      filter(i => i%2 == 0),
      map(i => 'value: ' + i),
      delay(1000)
    )
    .subscribe((i) => console.log(i));
  }

  takeClick() {
    const observable = new Observable((observer) => {
      let i;
      for(i=0 ; i< 20; i++) 
        setTimeout(() => observer.next(Math.floor(Math.random()*100)), i*100);
      setTimeout(() => observer.complete(), i*100);
    });
    const s: Subscription = observable
    .pipe(
      tap(i => console.log(i)),
      //take(10)
      // first()
      last()
    )
    .subscribe((value) => console.log('Output: ', value),
    (error) => console.error(error),
    () => console.log('complete!!')
    );

    const interval = setInterval(() =>{
      console.log('Ckecking...');
      if(s.closed) {
        console.warn('Subscription CLOSED!!!');
        clearInterval(interval);
      }
    },200)

  }

}
