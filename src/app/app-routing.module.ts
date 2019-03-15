import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './timeline/pages/timeline.component';
import { ProfileComponent } from './profile/pages/profile.component';
import { RegisterComponent } from './register/pages/register.component';
import { LoginComponent } from './login/login.component';
import { ForgetComponent } from './forget/pages/forget.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { DialogComponent } from './timeline/dialog/dialog/dialog.component';
import { SearchEngineComponent } from './search-engine/pages/search-engine.component';
import { UserProfileComponent } from './user-profile/pages/user-profile.component';

const routes: Routes = [
  //default route when the website is loaded
  { path: '', redirectTo: '/timeline', pathMatch: 'full' },

  //routes for the rest of the tabs
  { path: 'login', component: LoginComponent },
  { path: 'timeline', component: TimelineComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'forget', component: ForgetComponent },
  { path: 'dialog', component: DialogComponent},
  { path: 'search', component: SearchEngineComponent},
  { path: 'userProfile', component: UserProfileComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
