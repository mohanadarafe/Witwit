import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetComponent } from './pages/forget.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ForgetComponent,
 
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,//was CommonModule
    ReactiveFormsModule, //was FormsModule
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })

  ],

  bootstrap : [ForgetComponent]
 
})
export class ForgetModule { }
