import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    RegisterComponent,
    FormsModule
  ]
})
export class RegisterModule { }
