import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material.module";
import { FormsModule } from '@angular/forms';
import { BasicCreateComponent } from './basic-create/basic-create.component';
import { OperatorsComponent } from './operators/operators.component';
import { AsyncComponent } from './async/async.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { SwitchMergeComponent } from './switch-merge/switch-merge.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicCreateComponent,
    OperatorsComponent,
    AsyncComponent,
    ErrorHandlingComponent,
    DragAndDropComponent,
    SwitchMergeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
