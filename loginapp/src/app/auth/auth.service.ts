import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { catchError, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = 'http://localhost:3000/auth';
  private subjUse$: BehaviorSubject<any> = new BehaviorSubject(null);
  private subsjLoggedIn$: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user);
  }

  login(credentials: {email:string, password: string}): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, credentials)
    .pipe(
      tap((u: any) => {
        localStorage.setItem('token', u.token )
        this.subsjLoggedIn$.next(true);
        this.subjUse$.next(u);
      })
    )
  }

  isAuthenticated() : Observable<boolean> {
    const token = localStorage.getItem('token');

    if(token && !this.subsjLoggedIn$.value) {
      return this.chekTokenValidation();
    }
    return this.subsjLoggedIn$.asObservable();
  }

  chekTokenValidation(): Observable<boolean> {
    return this.http.get<any>(`${this.url}/user`)
    .pipe(
      tap((user) => {
        if(user) {
          localStorage.setItem('token', user.token )
          this.subsjLoggedIn$.next(true);
          this.subjUse$.next(user)
        }
      }),
      map((user) => (user)? true : false),
      catchError((err) => {
        this.logout();
        return of (false);
      })

    );
  }

  getUser(): Observable<User> {
    return this.subjUse$.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.subsjLoggedIn$.next(false);
    this.subjUse$.next(null);
  }
}
