import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material-module.component';
import { ToolbarModule } from './toolbar/toolbar.module';
import { TimelineModule } from './timeline/timeline.module';
import { RegisterModule } from './register/register.module';
import { ProfileModule } from './profile/profile.module';
import { ForgetModule } from './forget/forget.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '../app/shared/services/auth.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    ToolbarModule,
    TimelineModule,
    RegisterModule,
    ProfileModule,
    ForgetModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [FormsModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
