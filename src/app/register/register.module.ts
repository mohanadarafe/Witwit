import { NgModule } from '@angular/core';
import { RegisterComponent } from './pages/register.component';
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
  bootstrap: [RegisterComponent]
})
export class RegisterModule { }
