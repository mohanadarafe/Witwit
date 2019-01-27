import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './pages/toolbar.component';
import { MaterialModule } from '../shared/modules/material-module.component';
import { AppRoutingModule } from '../app-routing.module';
import { SearchComponent } from './pages/search/search.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
