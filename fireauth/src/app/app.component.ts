import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  user$: Observable<User> = new Observable<User>();
  authenticated$: Observable<boolean> = new Observable<boolean>();

  logout() {}
}
