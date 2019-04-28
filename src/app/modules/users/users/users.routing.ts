import { Routes, RouterModule } from '@angular/router';
import {default as config} from '../config/config.json';
import { UsersComponent } from './users.component';
import {UsersDetailComponent} from "./users-detail/users-detail.component";


const usersRoutes: Routes = [

    { path: config['users'].component.nameModule.toLowerCase() , component: UsersComponent, pathMatch: 'full' },
	{ path: config['users'].component.nameModule.toLowerCase()  + '/:id', component: UsersDetailComponent}
];

export const usersRouting = RouterModule.forChild(usersRoutes);
