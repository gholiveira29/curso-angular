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

  }
}
