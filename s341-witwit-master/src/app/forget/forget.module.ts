import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetComponent } from './pages/forget.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    ForgetComponent,
 
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,//was CommonModule
    ReactiveFormsModule, //was FormsModule
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      easeTime: 300,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    
        }),
  ],
  
  bootstrap : [ForgetComponent]
 
})
export class ForgetModule { }
