import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { PeopleComponent } from './main/people/people.component';
import { ProductsComponent } from './main/products/products.component';

const routes: Routes = [
  {path: 'main/people', component: PeopleComponent , canActivate: [AuthGuard]},
  {path: 'main/products', component: ProductsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
