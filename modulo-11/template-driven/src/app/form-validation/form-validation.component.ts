import { Component, OnInit } from '@angular/core';


interface Client {
  firstName: string;
  lastName: string;
  birth: Date;
  gender: string;
  street: string;
  city: string;
  state: string;
  phone1: string;
  phone2: string;
  age: number;
  email: string;
}

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {


  client: Client = {
    firstName: '',
    lastName: '',
    age: 0,
    birth: new Date(),
    gender: '',
    street: '',
    city: '',
    state: '',
    phone1: '',
    phone2: '',
    email: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.client);
  }

}
