import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { HttpClient } from '@angular/common/http';
import robotType from 'src/app/model/robotType';
import { Observable } from 'rxjs';
import Robot from 'src/app/model/robot';
import { API_CONFIG } from 'config';

@Injectable({
  providedIn: 'root'
})

export class RobotService {
  private apiBaseUrl = API_CONFIG.apiBaseUrl;
  private robotAPI_URL = this.apiBaseUrl + '/robot';
  
  constructor(private http: HttpClient, private messageService: MessageService) { }

  createRobot(rt: any) {
    console.log(rt);
    return this.http.post(`${this.robotAPI_URL}/createRobot`, rt)
  }

  addRobot(rt: any) {
    console.log(rt);
    return this.http.post(`${this.robotAPI_URL}/addRobot`, rt)
  }

  listRobotType(): Observable<robotType[]> {
    return this.http.get<robotType[]>(`${this.robotAPI_URL}/list`);
  }

  getActiveRobots(): Observable<Robot[]> {
    return this.http.get<Robot[]>(`${this.robotAPI_URL}/activeRobots`);
  }

  changerobotState(rt: any) {
    const headers = { 'Content-Type': 'application/json' };
    const body = { id: rt }; // assuming rt is just the ID value
    console.log(`${this.robotAPI_URL}/changeRobotState`, body, { headers });
    return this.http.patch(`${this.robotAPI_URL}/changeRobotState`, body, { headers });
  }
  
}