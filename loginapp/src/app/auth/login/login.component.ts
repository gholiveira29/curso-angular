import { AuthService } from './../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  });
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const credentials = this.loginForm.value;
    this.loading = true
    this.authService.login(credentials)
    .subscribe((user) =>{
      console.log(user)
      this.snackBar.open(
        'Logged in successfuly. Welcome  ' + user.firstname + '!', 'OK', 
        {duration: 3000});
        this.router.navigateByUrl('/main/people');
        this.loading = false;
    },
    (e) => {
      this.snackBar.open(
        'Login Error' , 'OK', {duration: 3000});
        this.loading = true;
    })
  }

}
