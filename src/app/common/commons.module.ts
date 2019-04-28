import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';
import { CommonsService } from './shared/commons.service';
import { CommonsComponent } from './commons.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule
	
  ],
  declarations: [
    CommonsComponent
  ],
  exports: [
    CommonsComponent

  ],
  providers: [
    CommonsService
  ]
})
export class CommonsModule { }
