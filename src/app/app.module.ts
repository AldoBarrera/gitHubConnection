import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent }      from './nav-bar/nav-bar.component';
import { CommonsModule } from "./common/commons.module";
import { UsersModule } from "./modules/users/users.module" 

@NgModule({
  declarations: [
    AppComponent,
	NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	CommonsModule,
	UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent, NavBarComponent]
})
export class AppModule { }
