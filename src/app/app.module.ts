import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material-module.component';
import { ToolbarModule } from './toolbar/toolbar.module';
import { TimelineModule } from './timeline/timeline.module';
import { RegisterModule } from './register/register.module';
import { ProfileModule } from './profile/profile.module';
import { ForgetModule } from './forget/forget.module';
import {LoginModule } from './login/login.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '../app/shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './shared/guard/auth.guard';
import { DialogprofileComponent } from './profile/dialogprofile/dialogprofile.component';
import { DialogComponent } from './timeline/dialog/dialog/dialog.component';
import {TokenInterceptorService} from './interceptor/token-interceptor.service';
import { SearchEngineModule } from './search-engine/search-engine.module';
import { EditprofileDialogComponent } from './profile/editprofile-dialog/editprofile-dialog.component';
import { PasswordDialogComponent } from './profile/password-dialog/password-dialog.component';


@NgModule({
  declarations: [AppComponent],
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
    LoginModule,
    SearchEngineModule,
    //service to make http calls to the backend
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  
  ],
  exports: [FormsModule],
  providers: [AuthService, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
 entryComponents: [DialogComponent, DialogprofileComponent, EditprofileDialogComponent, PasswordDialogComponent]
})
export class AppModule {}
