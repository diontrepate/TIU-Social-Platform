import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { LoginPageComponent } from './login-page/login-page.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import {SidebarModule} from 'primeng/sidebar';
import {MenuModule} from 'primeng/menu';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import { PreLandingPageComponent } from './pre-landing-page/pre-landing-page.component';
import {CheckboxModule} from 'primeng/checkbox';
import { HelpCenterComponent } from './help-center/help-center.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LandingPageComponent,
    PreLandingPageComponent,
    HelpCenterComponent,
    HomePageComponent,
    SignUpPageComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserAnimationsModule,
    CarouselModule,
    SidebarModule,
    MenuModule,
    InputTextareaModule,
    CardModule,
    DialogModule,
    DropdownModule,
    CheckboxModule
  ],

  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
