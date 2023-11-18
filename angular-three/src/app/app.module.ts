import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './component/appComponent/app.component';
import { MessagesComponent } from './component/messages/messages.component';

import { CreateRoomComponent } from './component/createRoom/createRoom.component';
import { MainMenuComponent } from './component/mainMenu/mainMenu.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    CreateRoomComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
