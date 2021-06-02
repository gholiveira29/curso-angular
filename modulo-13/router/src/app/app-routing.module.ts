import { Book } from './models/book';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { DvdDetailComponent } from './dvd/dvd-detail/dvd-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book/book.component';
import { DvdComponent } from './dvd/dvd.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { Routes, RouterModule } from '@angular/router';
import { DvdFormComponent } from './dvd/dvd-form/dvd-form.component';
import { BookAuthorsComponent } from './book/book-authors/book-authors.component';


const  appRouters: Routes = [
  {path: 'dvds', component: DvdComponent},
  {path: 'books', 
  component: BookComponent,
  children: [
    {path: ':index', 
    component: BookDetailComponent,
    children: [
      {path: 'authors' , component: BookAuthorsComponent}
    ]
  },
  ]

},
  {path: 'dvds/new', component: DvdFormComponent},
  {path: 'dvds/:index', component: DvdDetailComponent},
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
