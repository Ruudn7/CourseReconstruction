import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { LoginComponent } from './login/login.component';
import { RoutingComponent } from './routing/routing.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    HeaderNavbarComponent,
    LoginComponent,
    RoutingComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
