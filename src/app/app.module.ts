import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent }      from './nav-bar/nav-bar.component';
import { CommonsModule } from "./common/commons.module";
import { GitHubModule } from "./modules/github/github.module" 

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
	GitHubModule
  ],
  providers: [],
  bootstrap: [AppComponent, NavBarComponent]
})
export class AppModule { }
