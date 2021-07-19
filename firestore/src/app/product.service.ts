import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollection: AngularFirestoreCollection<Product> = this.afs.collection('products');

  constructor(private afs: AngularFirestore) { }

  getproducts(): Observable<Product[]> {
    return this.productsCollection.valueChanges();
  }

  addProduct(p: Product) {
    p.id = this.afs.createId();
    return this.productsCollection.doc(p.id).set(p);
    // return this.productsCollection.add(p); METODO MAIS SIMPLES DE SE CRIAR UM OBJETO NO BANCO 
  }

  deleteProduct(p: Product) {
    return this.productsCollection.doc(p.id).delete();
  }

  updateProduct(p: Product) {
    return this.productsCollection.doc(p.id).set(p);
  }
  searchByName(name: string): Observable<Product[]> {
    return this.afs.collection<Product>('products', ref  => ref.orderBy('name')
    .startAt(name).endAt(name+"\uf8ff"))
    .valueChanges();
  }
}
