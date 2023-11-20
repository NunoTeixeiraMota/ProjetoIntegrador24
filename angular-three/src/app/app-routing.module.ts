import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateRoomComponent } from './component/createRoom/createRoom.component';
import { MainMenuComponent } from './component/mainMenu/mainMenu.component';
import { CreateBuildingComponent } from './component/create-building.component/create-building.component';
import { CreateFloorComponent } from './component/create-floor.component/create-floor.component';
import { CreateLiftComponent } from './component/create-lift.component/create-lift.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainMenu', pathMatch: 'full' },
  { path: 'create-building', component: CreateBuildingComponent },
  {path: 'create-floor', component: CreateFloorComponent},
  { path: 'createRoom', component: CreateRoomComponent },
  { path: 'mainMenu', component: MainMenuComponent },
  {path: 'create-lift', component: CreateLiftComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
