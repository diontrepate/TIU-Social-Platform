import { HelpCenterComponent } from './help-center/help-center.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PreLandingPageComponent } from './pre-landing-page/pre-landing-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

const routes: Routes = [
  { path: 'preLanding/:id', component: PreLandingPageComponent},
  { path: 'preLanding', component: PreLandingPageComponent},
  { path: 'login', component: LoginPageComponent },
  { path: 'signUp', component: SignUpPageComponent },
  { path: '', component: HomePageComponent },
  { path: 'help' , component: HelpCenterComponent},
  { path: 'landing/:id', component: LandingPageComponent, canActivate: [AuthGuard] },
  { path: 'landing', component: LandingPageComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
