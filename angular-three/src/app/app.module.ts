import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';

import { AppComponent } from './component/appComponent/app.component';
import { MessagesComponent } from './component/messages.component/messages.component';
import { CreateRoomComponent } from './component/create-room.component/create-room.component';
import { MainMenuComponent } from './component/main-menu.component/main-menu.component';
import { CreateBuildingComponent } from './component/create-building.component/create-building.component'; // Import CreateBuildingComponent
import { CreateFloorComponent } from './component/create-floor.component/create-floor.component';
import { CreateLiftComponent } from './component/create-lift.component/create-lift.component';
import { UpdateBuildingComponent } from './component/update-building.component/update-building.component';
import { ListBuildingsComponent } from './component/list-buildings.component/list-buildings.component';
import { CreateRobotTypeComponent } from './component/create-robot-type.component/create-robot-type.component';
import { EditFloorComponent } from './component/edit-floor.component/edit-floor.component';
import { AddRobotComponent } from './component/add-robot.component/add-robot.component';
import { SingleFileUploadComponent } from './component/single-file-upload/single-file-upload.component';
import { ChangeRobotStateComponent } from './component/change-robot-state.component/change-robot-statecomponent';
import { ListFloorsFromBuildingComponent } from './component/list-floors-from-building.component/list-floors-from-building.component';
import { PatchFloorMapComponent } from './component/patch-floor-map.component/patch-floor-map.component';
import { PatchPassagesComponent } from './component/patch-passages.component/patch-passages.component';
import { ListPassageBetween2BuildingsComponent } from './component/list-2-Buildings-Passage.component/list-2-Buildings-Passage.component';
import { ListBuildingsMinMaxComponent } from './component/list-buildings-min-max.component/list-buildings-min-max.component';
import { Title } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditComponent } from './edit/edit.component';
import { CreateVigilanceTaskComponent } from './component/create-task-vigilance.component/create-task-vigilance.component';
import { CreateTaskPickDeliveryComponent } from './component/create-task-pick-delivery.component/create-task-pick-delivery.component';
import { ListTasksByAlgoritm } from './component/task-algorithms.component/task-algorithms.component';
import { NonAprovedListComponent } from './non-aproved-list/non-aproved-list.component';
import { AproveTaskComponent } from './component/aprove-task.component/aprove-task.component';
import { SearchTasksComponent } from './component/search-task.component/search-task.component';
import { CommonModule } from '@angular/common'; 
import { ApproveUserComponent } from './component/approve-user.component/approve-user/approve-user.component';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    CreateRoomComponent,
    MainMenuComponent,
    CreateBuildingComponent,
    CreateFloorComponent,
    CreateLiftComponent,
    UpdateBuildingComponent,
    ListBuildingsComponent,
    CreateRobotTypeComponent,
    EditFloorComponent,
    AddRobotComponent,
    SingleFileUploadComponent,
    ChangeRobotStateComponent,
    ListFloorsFromBuildingComponent,
    PatchFloorMapComponent,
    PatchPassagesComponent,
    ListPassageBetween2BuildingsComponent,
    ListBuildingsMinMaxComponent,
    LoginComponent,
    UserProfileComponent,
    EditComponent,
    CreateVigilanceTaskComponent,
    CreateTaskPickDeliveryComponent,
    ListTasksByAlgoritm,
    NonAprovedListComponent,
    AproveTaskComponent,
    SearchTasksComponent,
    ApproveUserComponent
    // ... any other components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    Title,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
