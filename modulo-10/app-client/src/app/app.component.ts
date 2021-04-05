import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-client';
  products$: Observable<Product[]>;
  productsErr: Product[];
  productsLoading: Product[];
  bloading: boolean = false;
  productsId: Product[];
  newlyProducts: Product[] = [];
  prodsToDelete: Product[];

  constructor(
    private productService: ProductsService,
    private snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    
  }

  getSimpleHttpRequest() {
  this.products$ = this.productService.getProduts();
  }

  ErrorRequest() {
    this.productService.getProductsErr()
      .subscribe((res) => {
        this.productsErr = res;
      },
        (err) => {
          let config = new MatSnackBarConfig();
          config.duration = 3000;
          config.panelClass = ['snack_err'];
          if(err.status == 0) {
            this.snackBar.open('Could not connect to the server', '', config);
          } else {

            this.snackBar.open(err.error.msg, '', config);
          }
        }
      )
  }

  ErrorRequestOk() {
    this.productService.getProductsDelay()
    .subscribe((res) => {
      this.productsErr = res;

      let config = new MatSnackBarConfig();
      config.duration = 3000;
      config.panelClass = ['snack_ok'];
        this.snackBar.open('Products successfuly loade!!', '', config);
      
    },
      (err) => {
        
      }
    )
  }

  RequestLoading() {
    this.bloading = true
    this.productService.getProductsDelay()
    .subscribe((res) => {
      this.productsLoading = res;
      this.bloading = false;
      
    },
      (err) => {
        this.bloading = false;
      }
    )
  }

  getProductsIds() {
    this.productService.getProductsIds()
    .subscribe((ids) => {
      this.productsId = ids.map(id => ({_id: id, name: '', department: '', price: 0}))
    })
  }

  loadName(id: string) {
    this.productService.getProductName(id)
    .subscribe((name) => {
      let index = this.productsId.findIndex(p=>p._id===id);
      if(index >= 0) {
        this.productsId[index].name = name;
      }
    })
  }

  saveProduct(name: string, department: string, price: number) {
    let p = {name, department, price};
    this.productService.saveProduct(p)
      .subscribe((res) => {
        this.newlyProducts.push(res)
        let config = new MatSnackBarConfig();
        config.duration = 3000;
        config.panelClass = ['snack_ok'];
          this.snackBar.open('Products successfuly loade!!', '', config);
      },
      (err) => {
        let config = new MatSnackBarConfig();
          config.duration = 3000;
          config.panelClass = ['snack_err'];
          if(err.status == 0) {
            this.snackBar.open('Could not connect to the server', '', config);
          } else {

            this.snackBar.open(err.error.msg, '', config);
          }
      }
      );
  }

  deleteProduct(p: Product) {
    this.productService.deleteProduct(p)
      .subscribe((res) => {
        let i = this.prodsToDelete.findIndex(prod=>p._id == prod._id);
        if(i>=0) {
          this.prodsToDelete.splice(i, 1);
        }
      }, (err) => {
        console.log(err)
      });
  }

  loadProductsToDelete() {
    this.productService.getProduts()
      .subscribe((res) => {
        this.prodsToDelete = res
      });
  }
}
