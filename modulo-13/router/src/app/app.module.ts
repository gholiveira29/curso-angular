import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookComponent } from './book/book.component';
import { DvdComponent } from './dvd/dvd.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const  appRouters: Routes = [
  {path: 'dvds', component: DvdComponent},
  {path: 'books', component: BookComponent},
  {path: '',pathMatch: 'full', redirectTo: 'dvds'},
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    DvdComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    RouterModule.forRoot(appRouters),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
