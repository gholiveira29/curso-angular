import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-book-authors',
  templateUrl: './book-authors.component.html',
  styleUrls: ['./book-authors.component.css']
})
export class BookAuthorsComponent implements OnInit {
  authors$: Observable<string[]>;

  constructor( 
    private route: ActivatedRoute
    
    ) { }

  ngOnInit(): void {
    this.authors$ = this.route.paramMap
      .pipe(
        map((parans: ParamMap) => (parans.get('authors').split(',')))
      )
  }

}
