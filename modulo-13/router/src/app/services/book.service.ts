import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Book } from '../models/book';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookSubsect$: BehaviorSubject<Book[]> = new  BehaviorSubject<Book[]>([]);
  public books$ = this.bookSubsect$.asObservable();

  constructor() { 
    timer(1000)
    .subscribe(() => {
      this.bookSubsect$.next([
        {title: 'Book 1', pages: 500, authors: ["John"]},
        {title: 'Book 2', pages: 200, authors: ["Hommer"]},
        {title: 'Book 3', pages: 300, authors: ["Jeff", "Paul"]},
        {title: 'Book 4', pages: 1100, authors: ["Holaf, Katnis"]},
        {title: 'Book 5', pages: 350, authors: ["Harry"]},
      ])
    })
  }

  add(b: Book) {
    this.bookSubsect$.getValue().push(b);
  }

  remove(i: number) {
    let books = this.bookSubsect$.getValue();

    if(i >= 0 &&  i < books.length) {
      books.splice(i,1);
    }
  }

  get(i: number): Observable<Book> {
    return this.books$.pipe(
      map(books => (i >= 0 && i < books.length) ? books[i] : null),
      delay(1000)
    )
  }
  
}
