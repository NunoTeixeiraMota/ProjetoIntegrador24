import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './component/appComponent/app.component';
import { MessagesComponent } from './component/messages/messages.component';
import { CreateRoomComponent } from './component/createRoom/createRoom.component';
import { MainMenuComponent } from './component/mainMenu/mainMenu.component';
import { CreateBuildingComponent } from './component/create-building.component/create-building.component'; // Import CreateBuildingComponent
import { CreateFloorComponent } from './component/create-floor.component/create-floor.component';
import { UpdateBuildingComponent } from './component/update-building.component/update-building.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    CreateRoomComponent,
    MainMenuComponent,
    CreateBuildingComponent, // Declare CreateBuildingComponent
    CreateFloorComponent,
    UpdateBuildingComponent,
    // ... any other components
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, // Add HttpClientModule here
    // ... any other modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
