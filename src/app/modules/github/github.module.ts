import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }  from '@angular/router';
import { HttpModule }  from '@angular/http';

import { UsersComponent } from "./users-component/users.component"; 
import { UsersDetailComponent } from "./users-component/users-detail/users-detail.component"; 
import { UsersService } from "./users-component/shared/users.service"; 
import { usersRouting } from "./users-component/users.routing"; 

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
	  usersRouting
  ],
  declarations: [
    UsersComponent,
    UsersDetailComponent	
  ],
  exports: [
    UsersComponent, 

  ],
  providers: [
    UsersService, 
  ]
})
export class GitHubModule { }
