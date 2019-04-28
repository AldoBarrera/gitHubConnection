import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonsComponent } from '../../../../common/commons.component';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-github-form',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.less']
})
export class UsersDetailComponent extends CommonsComponent {

  constructor(route: ActivatedRoute,private usersService: UsersService) 
  {
    super(route, usersService);
    this.moduleName = "github" ;
  }
}
