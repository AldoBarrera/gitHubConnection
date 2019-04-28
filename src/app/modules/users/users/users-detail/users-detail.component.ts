import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonsComponent } from '../../../../common/commons.component';

import {default as config} from '../../config/config.json';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-' + config['users'].component.nameModule + '-form',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent extends CommonsComponent {
  

  constructor(router: Router, route: ActivatedRoute,private usersService: UsersService) 
  {
    super(router, route, usersService);
    this.moduleName = config['users'].component.nameModule ;
    
  }


}
