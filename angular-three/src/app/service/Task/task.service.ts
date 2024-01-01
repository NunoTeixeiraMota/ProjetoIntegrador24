import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/user';
import { API_CONFIG } from 'config';
import { MessageService } from '../message/message.service';
import taskVigilance from 'src/app/model/taskVigilance';
import taskPickDelivery from 'src/app/model/taskPickDelivery';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiBaseUrl = API_CONFIG.apiBaseUrlAuth;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  vigilance(task: taskVigilance): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(`${this.apiBaseUrl}/Task/Vigilance`, task, httpOptions);
  }

  pickDelivery(task: taskPickDelivery): Observable<any> {
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
    const headers = { 'Content-Type': 'application/json' }; // If needed
    return this.http.patch<any>(
      '${this.apiBaseUrl}/Task/PickDelivery/Approve/${taskId}', // If taskId is expected in URL
      null, // Or the appropriate request body if required
      { headers }
      // Include if headers are not set globally
    );
  }

  denyPickDeliveryTask(taskId: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' }; // If needed
    return this.http.patch<any>(
      '${this.apiBaseUrl}/Task/PickDelivery/Deny/${taskId}', // If taskId is expected in URL
      null, // Or the appropriate request body if required
      { headers } // Include if headers are not set globally
    );
  }

  approveVigilanceTask(taskId: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' }; // If needed
    return this.http.patch<any>(
      '${this.apiBaseUrl}/Task/Vigilance/Approve/${taskId}', // If taskId is expected in URL
      null, // Or the appropriate request body if required
      { headers } // Include if headers are not set globally
    );
  }

  denyVigilanceTask(taskId: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' }; // If needed
    return this.http.patch<any>(
      '${this.apiBaseUrl}/Task/Vigilance/Deny/${taskId}', // If taskId is expected in URL
      null, // Or the appropriate request body if required
      { headers } // Include if headers are not set globally
    );
  }
  searchTasks(searchTerm: string): Observable<any> {
    // Make the HTTP GET request regardless of whether searchTerm is empty
    return this.http.get<any>('${this.apiBaseUrl}/Task/Search/${searchTerm}');
}
  

}