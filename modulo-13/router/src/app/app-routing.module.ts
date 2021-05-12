import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book/book.component';
import { DvdComponent } from './dvd/dvd.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { Routes, RouterModule } from '@angular/router';


const  appRouters: Routes = [
  {path: 'dvds', component: DvdComponent},
  {path: 'books', component: BookComponent},
  {path: '',pathMatch: 'full', redirectTo: 'dvds'},
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRouters),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
