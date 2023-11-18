import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomCreateComponent } from './component/createRoom/createRoom.component';

const routes: Routes = [
// Redirect to the cube component on app load
{ path: '', redirectTo: '/cube', pathMatch: 'full' },
// Route for the cube component
{ path: 'cube', component: CubeComponent },
{ path: 'roomCreate', component: RoomCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  