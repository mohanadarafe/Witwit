import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register.component';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
