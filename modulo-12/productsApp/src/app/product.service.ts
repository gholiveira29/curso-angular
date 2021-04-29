import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { DepartmentService } from './department.service';
import { map, tap } from 'rxjs/operators';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url = 'http://localhost:3000/products';
  private productsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);
  private loaded: boolean = false;
  constructor(
    private http: HttpClient,
    private departmentService: DepartmentService
    ) { }

  getProducts(): Observable<Product[]> {
    if(!this.loaded) {
      combineLatest(
        this.http.get<Product[]>(this.url),
        this.departmentService.get()
      ).pipe(
        map(([products,departments]) => {
          for(let p of products) {
            let ids = (p.department as string[]);
            p.department = ids.map((id) => departments.find(dep => dep._id == id));
          }
          return products;
        })
      )
        .subscribe(this.productsSubject$);
      this.loaded = true;
    }
    return this.productsSubject$.asObservable();
  }

  addProduct(prod: Product): Observable<Product> {
    let departments = ( prod.department as Department[]).map( d=> d._id);
    return this.http.post<Product>(this.url, {...prod, departments})
      .pipe(
        tap((p) => {
          this.productsSubject$.getValue()
            .push({...prod, _id: p._id})
        })
      )
  }

  deleteProduct(prod: Product): Observable<any> {
    return this.http.delete(`${this.url}/${prod._id}`)
      .pipe(
        tap(() => {
          let products = this.productsSubject$.getValue();
          let i = products.findIndex(p => p._id === prod._id);
          if( i>=0) {
            products.splice(i, 1);
          }
        })
      )
  }
  
  updateProduct(prod: Product): Observable<Product> {
    let departments = ( prod.department as Department[]).map( d=> d._id);
    return this.http.patch<Product>(`${this.url}/${prod._id}`, {...prod, departments})
    .pipe(
      tap(() => {
        let products = this.productsSubject$.getValue();
        let i = products.findIndex(p => p._id === prod._id);
        if( i>=0) {
          products[i] = prod;
        }
      })
    )
  }

}
