import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reactive-form-valid',
  templateUrl: './reactive-form-valid.component.html',
  styleUrls: ['./reactive-form-valid.component.css']
})
export class ReactiveFormValidComponent implements OnInit {

  clientForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    birth: [new Date()],
    age: [0],
    email: [''],
    street: [''],
    city: [''],
    state: [''],
    phone1: [''],
    phone2: [''],
    });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  onSubmit() {
    console.log(this.clientForm.value);
  }
}
