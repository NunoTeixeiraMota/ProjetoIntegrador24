import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateRoomComponent } from './component/create-room.component/create-room.component';
import { MainMenuComponent } from './component/main-menu.component/main-menu.component';
import { CreateBuildingComponent } from './component/create-building.component/create-building.component';
import { CreateFloorComponent } from './component/create-floor.component/create-floor.component';
import { UpdateBuildingComponent } from './component/update-building.component/update-building.component';
import { CreateLiftComponent } from './component/create-lift.component/create-lift.component';
import { ListBuildingsComponent } from './component/list-buildings.component/list-buildings.component';
import { CreateRobotTypeComponent } from './component/create-robot-type.component/create-robot-type.component';
import { SingleFileUploadComponent } from './component/single-file-upload/single-file-upload.component';
import { EditFloorComponent } from './component/edit-floor.component/edit-floor.component';
import { AddRobotComponent } from './component/add-robot.component/add-robot.component';
import { ChangeRobotStateComponent } from './component/change-robot-state.component/change-robot-statecomponent';
import { ListFloorsFromBuildingComponent } from './component/list-floors-from-building.component/list-floors-from-building.component';
import { PatchFloorMapComponent } from './component/patch-floor-map.component/patch-floor-map.component';
import { PatchPassagesComponent } from './component/patch-passages.component/patch-passages.component';
import { ListPassageBetween2BuildingsComponent } from './component/list-2-Buildings-Passage.component/list-2-Buildings-Passage.component';
import { ListBuildingsMinMaxComponent } from './component/list-buildings-min-max.component/list-buildings-min-max.component';
import { AuthGuard } from './auth-guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MANAGER'] }, },
  { path: '', redirectTo: '/main-menu', pathMatch: 'full' },
  { path: 'create-building', component: CreateBuildingComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'] } },
  { path: 'create-floor', component: CreateFloorComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'] } },
  { path: 'create-room', component: CreateRoomComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'] } },
  { path: 'main-menu', component: MainMenuComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MANAGER'] } },
  { path: 'create-lift', component: CreateLiftComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'] } },
  { path: 'list-buildings', component: ListBuildingsComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_USER'] } },
  { path: 'create-robot-type', component: CreateRobotTypeComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'] } },
  { path: 'single-file-upload', component: SingleFileUploadComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'] } },
  { path: 'edit-floor', component: EditFloorComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'] } },
  { path: 'add-robot', component: AddRobotComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'] } },
  { path: 'change-robot-state', component: ChangeRobotStateComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'] } },
  { path: 'update-building', component: UpdateBuildingComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'] } },
  { path: 'list-floors-from-building', component: ListFloorsFromBuildingComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_USER'] } },
  { path: 'patch-floor-map', component: PatchFloorMapComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'] } },
  { path: 'patch-passages', component: PatchPassagesComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'] } },
  { path: 'list-2-buildings-passage', component: ListPassageBetween2BuildingsComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MANAGER'] } },
  { path: 'list-buildings-min-max', component: ListBuildingsMinMaxComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MANAGER'] } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit', component: EditComponent, canActivate: [AuthGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MANAGER'] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
