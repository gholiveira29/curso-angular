import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { from , fromEvent,  interval, Observable, Subject, Subscription, timer } from 'rxjs';
import { debounceTime, delay, filter, first, last, map, take, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  @ViewChild(MatRipple) ripple: MatRipple;

  searchInput: string = '';

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

debounceTimeClick() {
  fromEvent(document, 'click')
  .pipe(
    tap((e) => console.log("click")),
    debounceTime(1000)
  )
  .subscribe((e: MouseEvent) => {
    this.lautRipple();
  })
  }

  lautRipple() {
    const rippleRef = this.ripple.launch({
      persistent: true,
      centered: true
    });
    rippleRef.fadeOut;
  }

  searchEntry$ : Subject<string> = new Subject<string>();
  searchBy_UsingDebounce(event) {
    this.searchEntry$.next(this.searchInput);
  }

  debounceTimeSearchClick() {
    this.searchEntry$
    .pipe(
      debounceTime(1000)
    )
    .subscribe((e) => console.log(e))
  }

  takeWhilwClick() {
    interval(500)
    .pipe(
      takeWhile((value, index) => (value <= 5))
    )
    .subscribe((e) => console.log('takeWhile', e))
  }

  takeUntilClick() {
    let dudeTime$ = timer(5000);
    interval(500)
    .pipe(
      takeUntil(dudeTime$)
    )
    .subscribe((e) => console.log('takeWhile', e))
  }

}
