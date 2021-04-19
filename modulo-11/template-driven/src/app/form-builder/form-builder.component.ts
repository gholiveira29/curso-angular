import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  clientForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    street: [''],
    city: [''],
    state: ['']
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  submit() {

  }

}
