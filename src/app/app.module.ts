import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProfileComponent } from './profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material-module.component';
import { ToolbarModule } from './toolbar/toolbar.module';
import { TimelineModule } from './timeline/timeline.module';
import { RegisterModule } from './register/register.module';
import { ProfileModule } from './profile/profile.module';
import { ForgetModule } from './forget/forget.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TimelineComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    ToolbarModule,
    TimelineModule,
    RegisterModule,
    ProfileModule,
    ForgetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
