import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, Observable, Observer, of, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-basic-create',
  templateUrl: './basic-create.component.html',
  styleUrls: ['./basic-create.component.css']
})
export class BasicCreateComponent implements OnInit {

subscription: Subscription = new Subscription();

  constructor() { }


  ngOnInit(): void {
  }


  observableCreate() {
    // const hello = Observable.create((observe: Observer<any>) => {
    //   observe.next('hello');
    //   observe.next('from');
    //   observe.next('observable');
    //   observe.complete();
    // });
    // hello.subiscribe((value => console.log(value)));
    console.log('forma antiga de se fazer olhar o código');
  }

  from() {
    from([1,2,3,4,5,6,7,8,9,10])
    .subscribe((value) => console.log(value));
  }

  ofClick() {
    of([1,2,3,4,5,6,7,8,9,10])
    .subscribe((value) => console.log(value));
  }

  interval() {
    const source = interval(1000);
    const subscription = source.subscribe((value) => console.log(value));
    this.subscription.add(subscription)
  }

  timer() {
    const teste = timer(3000,2000);
    const subscription = teste.subscribe((value) => console.log(value));
    this.subscription.add(subscription);
  }
  
  fromEvent() {
    const subscription = fromEvent(document, 'click')
    .subscribe((event) => console.log(event));
    this.subscription.add(subscription);
  }

  unSubscribe() {
    this.subscription.unsubscribe();
  }
}
