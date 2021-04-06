import { Product } from './../product.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dailog-edit-prod',
  templateUrl: './dailog-edit-prod.component.html',
  styleUrls: ['./dailog-edit-prod.component.css']
})
export class DailogEditProdComponent implements OnInit {

  product: Product = {_id: '',name: '', department: '', price: 0};

  constructor(
    public dialogRef: MatDialogRef<DailogEditProdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product) { this.product = data; }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

}
