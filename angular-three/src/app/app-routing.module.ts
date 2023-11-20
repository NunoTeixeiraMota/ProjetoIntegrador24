import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateRoomComponent } from './component/createRoom/createRoom.component';
import { MainMenuComponent } from './component/mainMenu/mainMenu.component';
import { CreateBuildingComponent } from './component/create-building.component/create-building.component';
import { CreateFloorComponent } from './component/create-floor.component/create-floor.component';
import {UpdateBuildingComponent} from './component/update-building.component/update-building.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainMenu', pathMatch: 'full' },
  { path: 'create-building', component: CreateBuildingComponent },
  {path: 'create-floor', component: CreateFloorComponent},
  { path: 'createRoom', component: CreateRoomComponent },
  { path: 'mainMenu', component: MainMenuComponent },
  { path: 'update-building', component: UpdateBuildingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
