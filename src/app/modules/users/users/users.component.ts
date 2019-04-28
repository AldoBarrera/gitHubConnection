import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonsComponent } from '../../../common/commons.component';
import {UsersService} from "./shared/users.service";

@Component({
  selector: 'app-users' ,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent extends CommonsComponent {

  @Input() datafromadd: any[] = [];
  constructor(router: Router, route: ActivatedRoute,usersService: UsersService) { 
    super(router, route, usersService);
  }

  responseData(data: any) {
    super.getPagesURL();
    for (let value of data) {
      this.addData(value) ;    }
  }

  addData(value) {
    this.data.push(value);
  }


 
  
}
