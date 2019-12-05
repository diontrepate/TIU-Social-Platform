import { AuthService } from './services/auth.service';
import { UploadComponent } from './upload/upload.component';
import { HelpCenterComponent } from './help-center/help-center.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PreLandingPageComponent } from './pre-landing-page/pre-landing-page.component';


const routes: Routes = [
  { path: 'preLanding/:id', component: PreLandingPageComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'upload/:id', component: UploadComponent},
  { path: 'upload', component: UploadComponent},
  { path: 'help' , component: HelpCenterComponent},
  { path: 'landing/:id', component: LandingPageComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
