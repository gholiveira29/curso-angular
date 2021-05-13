import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private bookService: BookService) { }

  books$: Observable<Book[]>

  ngOnInit(): void {
    this.books$ = this.bookService.books$;
  }

}
