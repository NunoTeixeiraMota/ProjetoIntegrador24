import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

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
  updateBuilding (buildingData: any){
    console.log('buildingData',buildingData);
    return this.http.put(`${this.apiBaseUrl}/building/update`,buildingData);
  }
  getBuildings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/building/list`);
  }
}