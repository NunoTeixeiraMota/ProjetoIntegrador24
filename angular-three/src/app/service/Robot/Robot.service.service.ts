import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { HttpClient } from '@angular/common/http';
import robotType from 'src/app/model/robotType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RobotService {
  private robotAPI_URL = 'http://localhost:4000/api/robot';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createRobot(rt: any) {
    console.log(rt);
    return this.http.post(`${this.robotAPI_URL}/createRobot`, rt, {'headers':{'content-type': 'application/json'} , observe: 'response'})
  }

  addRobot(rt: any) {
    console.log(rt);
    return this.http.post(`${this.robotAPI_URL}/addRobot`, rt, {'headers':{'content-type': 'application/json'} , observe: 'response'})
  }

  listRobotType(): Observable<robotType[]> {
    return this.http.get<robotType[]>(`${this.robotAPI_URL}/list`);
  }

  changerobotState(rt: any) {
    const headers = {'content-type': 'application/json'};
    
    const body = { id: rt };
    console.log(body);
    return this.http.post<robotType>(this.robotAPI_URL + "/changeRobotState", body, {'headers':headers , observe: 'response'})
  }

}