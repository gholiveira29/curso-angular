import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  user$: Observable<User> = new Observable<User>();
  authenticated$: Observable<boolean> = new Observable<boolean>();

  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.getUser();
    this.authenticated$ = this.authService.authenticateds();
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/')
  }
}
