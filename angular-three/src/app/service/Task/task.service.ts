import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'config';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiBaseUrl = API_CONFIG.apiBaseUrlAuth;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  vigilance(task: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(`${this.apiBaseUrl}/Task/Vigilance`, task, httpOptions);
  }

  pickDelivery(task: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(`${this.apiBaseUrl}/Task/PickDelivery`, task, httpOptions);
  }

  tasksLessTime(): Observable<any> {

    return this.http.get<any>(`${this.apiBaseUrl}/Task/LessTime`);
  }

  tasksGenetic(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/Task/Genetic`);
  }

  getNonAprovedTasks(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/Task/GetAllNonAproved`);
  }
  approvePickDeliveryTask(taskId: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.patch<any>(
      `${this.apiBaseUrl}/Task/PickDelivery/Approve/${taskId}`, 
      null, 
      { headers }
    );
  }

  denyPickDeliveryTask(taskId: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' }; 
    return this.http.patch<any>(
      `${this.apiBaseUrl}/Task/PickDelivery/Deny/${taskId}`, 
      null, 
      { headers } 
    );
  }

  approveVigilanceTask(taskId: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' }; 
    return this.http.patch<any>(
      `${this.apiBaseUrl}/Task/Vigilance/Approve/${taskId}`, 
      null, 
      { headers } 
    );
  }

  denyVigilanceTask(taskId: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' }; 
    return this.http.patch<any>(
      `${this.apiBaseUrl}/Task/Vigilance/Deny/${taskId}`, 
      null, 
      { headers } 
    );
  }
  searchTasks(searchTerm: string): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/Task/Search/${searchTerm}`);
}
  

}