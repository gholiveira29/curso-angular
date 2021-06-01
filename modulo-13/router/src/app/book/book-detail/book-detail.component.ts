import { Book } from './../../models/book';
import { Observable } from 'rxjs';
import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book$: Observable<Book> = null;
  index: number;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
    
    ) { }

  ngOnInit(): void {

    this.book$ = this.route.paramMap
        .pipe( 
          tap((paramns: ParamMap) => this.index = +paramns.get('index')),
          switchMap((params: ParamMap) => this.bookService.get(+params.get('index'))))
    // .subscribe((paranms: ParamMap) => {
    //   console.log("Index: ", paranms.get('index'))});

  }


  remove() {
    this.bookService.remove(this.index);
    this.router.navigate(["books"])
  }

}
