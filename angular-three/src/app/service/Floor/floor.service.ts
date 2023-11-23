import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import floor from 'src/app/model/floor';
import Floor from 'src/app/model/floor';

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

  editFloor(floordata: any) {
    const headers = {'content-type': 'application/json'};
    
    const body = JSON.stringify(floordata);
    console.log(body);
    return this.http.post<floor>(this.apiBaseUrl + "/floor/updateFloor", body, {'headers':headers , observe: 'response'})
  }
  
  createFloorMap(mapdata: any) {
    console.log('mapdata: ', mapdata);
    return this.http.post(`${this.apiBaseUrl}/floor/uploadmap`, mapdata);
  }

  ListFloorsFromBuildingComponent(buildingId: string) {
    const requestBody = { buildingId: buildingId };
    return this.http.post<Floor[]>(this.apiBaseUrl + "/floor/listBuildingsByFloors", requestBody);
  }
  
  
}
