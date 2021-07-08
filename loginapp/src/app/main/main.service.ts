import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  readonly url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getpeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.url}/people`)
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`);
  }
}
