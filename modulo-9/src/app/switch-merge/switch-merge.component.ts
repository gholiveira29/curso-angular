import { Observable, fromEvent, of } from 'rxjs';
import { Person } from './person.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeAll, map, mergeMap, switchAll, switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-switch-merge',
  templateUrl: './switch-merge.component.html',
  styleUrls: ['./switch-merge.component.css']
})
export class SwitchMergeComponent implements OnInit {
  @ViewChild('shearchBy') search: ElementRef

  searchInput: string = '';
  people$: Observable<Person[]>;


  constructor(private http: HttpClient) { }

  readonly url = 'http://localhost:9000';

  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void {
    // this.firtsOpton();
    // this.secondOption();
    this.thirdOption();
  }

  firtsOpton() {
    fromEvent(this.search.nativeElement, 'keyup')
      .subscribe((element) => {
        this.filterPeple(this.searchInput)
        .subscribe(e => console.log('res', e))
      })
  }

  filterPeple(searchInput: string): Observable<Person[]> {
    if(searchInput.length === 0) {
      return of([]);
    } else {
      return this.http.get<Person[]>(`${this.url}/${searchInput}`)
    }
  }

  secondOption() {
    let keyup$ = fromEvent(this.search.nativeElement, 'keyup');
    // let fetch$ = keyup$.pipe(map( (e) => this.filterPeple(this.searchInput)));

    // fetch$.pipe(mergeAll())
    // .subscribe((data) => console.log(data));

    // this.people$ = fetch$.pipe(mergeAll());
  
    this.people$ =  keyup$.pipe(mergeMap( () => this.filterPeple(this.searchInput)));
  }

  thirdOption() {
    let keyup$ = fromEvent(this.search.nativeElement, 'keyup');

    // this.people$ =  keyup$.pipe(
    //   map(() => this.filterPeple(this.searchInput)))
    //   .pipe(switchAll());

    this.people$ = keyup$.pipe(
      debounceTime(700),
      switchMap(() => this.filterPeple(this.searchInput))
    )
  }

}
