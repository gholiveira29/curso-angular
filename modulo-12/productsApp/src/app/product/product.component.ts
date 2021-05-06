import { DepartmentService } from './../department.service';
import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Department } from '../department';
import { MatSnackBar } from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup = this.fb.group({
    _id: [null],
    name: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(1)]],
    departments: [[], [Validators.required]]
  });

  products: Product [] = [];
  Departments:  Department[] = [];

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe((prods) => this.products = prods);

    this.departmentService.get()
    .subscribe((deps) => this.Departments = deps);
  }

  save() {
    let data = this.productForm.value;

    if(data._id != null) {
      this.productService.updateProduct(data)
        .subscribe(() => {
          this.notiFy('Product EDIT!')
        },
          (err) => {
            this.notiFy(err);''
          }
        )
    } else {
      this.productService.addProduct(data)
        .subscribe(() => {
          this.notiFy("Product save!");
        },
          (err) => {
            this.notiFy(err);
          }
        )
    }
  }

  delet(prod: Product) {
    this.productService.deleteProduct(prod)
      .subscribe(() => {
        this.notiFy('Deleted')
      },
        (err) => {
          this.notiFy(err);
        }
      )
  }

  edit(prod : Product) {
    this.productForm.setValue(prod);
  }

  notiFy(msg: string) {
    this.snackBar.open(msg, "OK", {duration: 5000});
  }

}
