import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './timeline/pages/timeline.component';
import { ProfileComponent } from './profile/pages/profile.component';
import { RegisterComponent } from './register/pages/register.component';
import { LoginComponent } from './login/login.component';
import { ForgetComponent } from './forget/forget.component';

const routes: Routes = [
  { path: '', redirectTo: '/timeline', pathMatch: 'full' },
  { path: 'timeline', component: TimelineComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget', component: ForgetComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
