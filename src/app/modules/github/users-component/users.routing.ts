import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import {UsersDetailComponent} from "./users-detail/users-detail.component";


const usersRoutes: Routes = [

    { path: 'users' , component: UsersComponent, pathMatch: 'full' },
	{ path: 'users/:id', component: UsersDetailComponent},
	{ path: 'users/:id/:page', component: UsersDetailComponent}
];

export const usersRouting = RouterModule.forChild(usersRoutes);
