import { Routes, RouterModule } from '@angular/router';
import {default as config} from '../config/config.json';
import { UsersComponent } from './users.component';


const usersRoutes: Routes = [

    { path: config['users'].component.nameModule.toLowerCase() , component: UsersComponent, pathMatch: 'full' }
];

export const usersRouting = RouterModule.forChild(usersRoutes);
