import { catchError } from 'rxjs/operators';
import { User } from 'src/app/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snack: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value)
      .then(() => {
        this.snack.open('Logged in successfully . Welvome!!', 'OK', {duration: 5000});
        this.router.navigateByUrl('/people')
        this.loading = false;
      },
      catchError((err) => throwError(err))
        
      )
      
  }

  loginGoogle() {

  }

}
