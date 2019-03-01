import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/modules/material-module.component';
import { AppRoutingModule } from '../app-routing.module';
import { SearchEngineComponent } from './pages/search-engine.component';

@NgModule({
  declarations: [SearchEngineComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
  ],
  bootstrap: [SearchEngineComponent]
})
export class SearchEngineModule { }
