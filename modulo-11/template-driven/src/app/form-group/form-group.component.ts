import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit {

  clientForm = new FormGroup({
    fistName: new FormControl(''),
    lastName: new FormControl(''),
    name: new FormGroup({
      fistName: new FormControl(''),
      lastName: new FormControl(''),
    })
  })

  constructor() { }

  ngOnInit(): void {
  }

  Submit() {
    console.log(this.clientForm.value)
  }

}
