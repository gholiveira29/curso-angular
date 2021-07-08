import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './main/people/people.component';
import { ProductsComponent } from './main/products/products.component';

const routes: Routes = [
  // {path: '', redirectTo: '/people'},
  {path: 'main/people', component: PeopleComponent},
  {path: 'main/products', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
