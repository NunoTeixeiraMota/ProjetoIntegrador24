import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'config';

@Injectable({
  providedIn: 'root'
})
export class LiftService {
  private apiBaseUrl = API_CONFIG.apiBaseUrl; 

  constructor(private http: HttpClient) {}

  createLift(liftData: any) {
    console.log('liftData: ', liftData);
    return this.http.post(`${this.apiBaseUrl}/lift/create`, liftData);
  }
}
