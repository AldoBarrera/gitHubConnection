import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Error403Component} from "./errors/error403.component";

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'errorpermission', component: Error403Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

