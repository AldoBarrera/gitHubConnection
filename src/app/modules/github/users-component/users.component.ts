import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonsComponent } from '../../../common/commons.component';
import {UsersService} from "./shared/users.service";

@Component({
  selector: 'app-users' ,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent extends CommonsComponent {

  constructor(route: ActivatedRoute,usersService: UsersService) { 
    super(route, usersService);
  }

  responseData(data: any) {
	  
    super.getPagesURL();
	
    for (let value of data) {
      this.addData(value) ;    
	}
  }

  addData(value) {
	  
    this.data.push(value);
  }
  
}
