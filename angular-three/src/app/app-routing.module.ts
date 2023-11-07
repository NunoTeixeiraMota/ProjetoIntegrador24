import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CubeComponent } from './cube/cube.component';
const routes: Routes = [
// Redirect to the cube component on app load
{ path: '', redirectTo: '/cube', pathMatch: 'full' },
// Route for the cube component
{ path: 'cube', component: CubeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  