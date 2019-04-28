import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonsService } from '../../../../common/shared/commons.service';
import {default as config} from '../../config/config.json';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService extends CommonsService {

  constructor(http: HttpClient) 
  { 
    super(http);    
    this.baseUrl = (environment.appConfig.url + config["users"].component.urlRelative).toLowerCase() ;
  } 
}
