import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material-module.component';
import { AppRoutingModule } from './app-routing.module';
import { TimelineModule } from './timeline/timeline.module';
import { ProfileModule } from './profile/profile.module';
import { RegisterModule } from './register/register.module';
import { ToolbarModule } from './toolbar/toolbar.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    TimelineModule,
    ProfileModule,
    RegisterModule,
    ToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
