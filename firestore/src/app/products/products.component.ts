import { Product } from './../models/product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]> = new Observable<Product[]>();
  filterProducts$: Observable<Product[]> = new Observable<Product[]>();
  displayedColumns = [
    'name',
    'price',
    'stock',
    'operations'
  ]

  productForm = this.fb.group({
    id: [undefined],
    name: [null, [Validators.required]],
    stock: [null, [Validators.required]],
    price: [null, [Validators.required]]
  });

  constructor( 
    private fb: FormBuilder,
    private productservice: ProductService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.products$ = this.productservice.getproducts()
  }

  onSubimit() {
    let p: Product = this.productForm.value;

    if(!p.id) {
      this.addProduct(p);
  } else {
    this.updateProduct(p)
  }
}

  addProduct(p: Product) {
    this.productservice.addProduct(p)
    .then(() => {
      this.snackBar.open('Product added.', 'OK', {duration: 4000});
      this.productForm.reset({
        name: null,
        stock: null,
        price: null,
        id: undefined
      });
    })
    .catch(() => {
      this.snackBar.open('Error on submiting the product.', 'OK', {duration: 4000});
    })  
  }

  updateProduct(p: Product) {
    this.productservice.updateProduct(p)
    .then(() => {
      this.snackBar.open('Product updated!', 'OK', {duration: 4000});
      this.productForm.reset({
        name: null,
        stock: null,
        price: null,
        id: undefined
      });
    })
    .catch(() => {
      this.snackBar.open('Error updating the product', 'OK', {duration: 4000});
    })
  }

  edit(p: Product) {
    this.productForm.setValue(p);
  }

  del(p: Product) {
    this.productservice.deleteProduct(p)
    .then(() => {
      this.snackBar.open('Product has been removed', 'OK', {duration: 4000});
    })
    .catch(() => {
      this.snackBar.open('Error when trying to remove the product', 'OK', {duration: 4000});
    })
  }

  filter(event: any) {
    this.filterProducts$ = this.productservice.searchByName(event.target.value);
  }

}
