import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  people$: Observable<Person[]>;

  addNew() {}

  updade(p: Person) {}

  delete(p: Person) {}
}
