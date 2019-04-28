import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { UsersComponent } from "./users/users.component"; 
import { UsersService } from "./users/shared/users.service"; 
import { usersRouting } from "./users/users.routing"; 

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
	  usersRouting
  ],
  declarations: [
    UsersComponent 
  ],
  exports: [
    UsersComponent, 

  ],
  providers: [
    UsersService, 
  ]
})
export class UsersModule { }
