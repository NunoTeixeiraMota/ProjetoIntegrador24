import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private apiBaseUrl = 'http://localhost:4000/api'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  createBuilding(buildingData: any) {
    console.log('buildingData: ', buildingData);
    return this.http.post(`${this.apiBaseUrl}/building/create`, buildingData);
  }
}
