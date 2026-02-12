import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxTreeListModule } from 'devextreme-angular/ui/tree-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomEditorComponent } from './custom-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxTreeListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
