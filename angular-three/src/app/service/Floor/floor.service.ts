import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  private apiBaseUrl = 'http://localhost:4000/api'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  createFloor(floordata: any) {
    console.log('floordata: ', floordata);
    return this.http.post(`${this.apiBaseUrl}/floor/create`, floordata);
  }
  
  createFloorMap(mapdata: any) {
    console.log('mapdata: ', mapdata);
    return this.http.post(`${this.apiBaseUrl}/floor/uploadmap`, mapdata);
  }
}
