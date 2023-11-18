import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateRoomComponent } from './component/createRoom/createRoom.component';
import { MainMenuComponent } from './component/mainMenu/mainMenu.component';

const routes: Routes = [
{ path: '', redirectTo: '/mainMenu', pathMatch: 'full' },
{ path: 'createRoom', component: CreateRoomComponent },
{ path: 'mainMenu', component: MainMenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  