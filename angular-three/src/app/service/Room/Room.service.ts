import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { HttpClient } from '@angular/common/http';
import room from 'src/app/model/room';

@Injectable({
  providedIn: 'root'
})

export class RoomService {
  private roomAPI_URL = 'https://localhost:4000/api/room';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createRoom(room: room) {
   
    const headers = {'content-type': 'application/json'};
    
    const body = JSON.stringify(room);
    console.log(body);
    return this.http.post<room>(this.roomAPI_URL + "/createRoom", body, {'headers':headers , observe: 'response'})
  }
}