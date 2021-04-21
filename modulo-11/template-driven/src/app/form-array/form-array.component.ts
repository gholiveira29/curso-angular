import { FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {

  clientForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    street: [''],
    city: [''],
    state: [''],
    phones: this.fb.array(['']),
    children: this.fb.array([]),

  })

  phones = this.clientForm.get('phones') as FormArray;
  childrens = this.clientForm.get('children') as FormArray;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.clientForm.value);
  }

  addPhone() {
    this.phones.push(this.fb.control(''));
  }

  addChildren() {
    this.childrens.push(
      this.fb.group({
      name: [''],
      age: ['']
    }));
  }

}
