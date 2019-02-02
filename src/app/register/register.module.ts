import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register.component';
//import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    BrowserModule,//was CommonModule
    ReactiveFormsModule, //was FormsModule
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  declarations: [
    RegisterComponent
  ],
  // exports: [
  //   RegisterComponent,
  //   ReactiveFormsModule
  // ],
  bootstrap: [RegisterComponent]
})
export class RegisterModule { }
