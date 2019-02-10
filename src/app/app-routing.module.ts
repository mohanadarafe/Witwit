import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './timeline/pages/timeline.component';
import { ProfileComponent } from './profile/pages/profile.component';
import { RegisterComponent } from './register/pages/register.component';
import { LoginComponent } from './login/login.component';
import { ForgetComponent } from './forget/pages/forget.component';

const routes: Routes = [
  //default route when the website is loaded
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  //routes for the rest of the tabs
  { path: 'login', component: LoginComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget', component: ForgetComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
