import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup = this.fb.group({
    firstname: [null, Validators.required],
    lastname: [null, Validators.required],
    address: [null, []],
    city: [null, []],
    phone: [null,[]],
    mobilephone: [null, []],
    state: [null, []],
    email: [null, [Validators.required, Validators.email]],
    password1: [null, [Validators.required, Validators.minLength(6)]],
    password2: [null, [Validators.required, Validators.minLength(6)]],
  },
    {validator: this.matchingPasswords});

    states = ['SP', 'MG', 'RS', 'RJ', 'PR'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snack: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  matchingPasswords(group: FormGroup) {
    if(group) {
      const password1 = group.controls['password1'].value;
      const password2 = group.controls['password2'].value;
      if(password1 == password2) {
        return null;
      }
    }
    return {matching: false};
  }

  onSubmit() {
    const newUser: User = {
      firstname: this.formRegister.controls['firstname'].value,
      lastname: this.formRegister.controls['lastname'].value,
      address: this.formRegister.controls['address'].value,
      city: this.formRegister.controls['city'].value,
      email: this.formRegister.controls['email'].value,
      mobilephone: this.formRegister.controls['mobilephone'].value,
      phone: this.formRegister.controls['phone'].value,
      state: this.formRegister.controls['state'].value,
      password: this.formRegister.controls['password1'].value,
    };
    this.authService.register(newUser)
    .subscribe(() => {
      this.snack.open('Successfully registered', 'OK', {duration: 5000});
      this.router.navigateByUrl('/');
    },
    () => {
      this.snack.open('Error', 'OK', {duration: 5000});
    }
    )
  }

}
