import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateRoomComponent } from './component/create-room.component/create-room.component';
import { MainMenuComponent } from './component/main-menu.component/main-menu.component';
import { CreateBuildingComponent } from './component/create-building.component/create-building.component';
import { CreateFloorComponent } from './component/create-floor.component/create-floor.component';
import { UpdateBuildingComponent } from './component/update-building.component/update-building.component';
import { CreateLiftComponent } from './component/create-lift.component/create-lift.component';

const routes: Routes = [
  { path: '', redirectTo: '/main-menu', pathMatch: 'full' },
  { path: 'create-building', component: CreateBuildingComponent },
  { path: 'create-floor', component: CreateFloorComponent},
  { path: 'create-room', component: CreateRoomComponent },
  { path: 'main-menu', component: MainMenuComponent },
  { path: 'update-building', component: UpdateBuildingComponent },
  { path: 'create-lift', component: CreateLiftComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
