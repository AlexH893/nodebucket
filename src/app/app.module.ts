import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { TaskViewComponent } from './task-view/task-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    SignInComponent,
    NotFoundComponent,
    TaskViewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    MatFormFieldModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
