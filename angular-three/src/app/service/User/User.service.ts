import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/user'; 
import { API_CONFIG } from 'config';
import { MessageService } from '../message/message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBaseUrl = API_CONFIG.apiBaseUrlAuth; 

  constructor(private http: HttpClient, private messageService: MessageService) { }

/*   getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiBaseUrl}/user/${id}`);
  }

  createUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<User>(`${this.apiBaseUrl}/auth/user/create`, user, httpOptions);
  }

  getUsersWithRole(role: String): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBaseUrl}/auth/user/roles/${role}`);
  } */

  signUp(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<User>(`${this.apiBaseUrl}/User/register`, user, httpOptions);
  }

  edit(user: any) {
    return this.http.post<any>(`${this.apiBaseUrl}/User/Edit`, user);
  }
}
