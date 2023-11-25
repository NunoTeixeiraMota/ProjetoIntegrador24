import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import floor from 'src/app/model/floor';
import Floor from 'src/app/model/floor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  private apiBaseUrl = 'http://localhost:4000/api'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  createFloor(floordata: any) {
    const headers = {'content-type': 'application/json'};
    
    const body = JSON.stringify(floordata);
    console.log(body);
    return this.http.post<floor>(this.apiBaseUrl + "/floor/create", body, {'headers':headers , observe: 'response'})
  }

  editFloor(floordata: any) {
    const headers = {'content-type': 'application/json'};
    
    const body = JSON.stringify(floordata);
    console.log(body);
    return this.http.put<floor>(this.apiBaseUrl + "/floor/updateFloor", body, {'headers':headers , observe: 'response'})
  }
  
  createFloorMap(mapdata: any) {
    console.log('mapdata: ', mapdata);
    return this.http.post(`${this.apiBaseUrl}/floor/uploadmap`, mapdata);
  }

  patchFloorMap(data: any) {
    console.log(data);
    return this.http.patch(`${this.apiBaseUrl}/floor/patchFloorMap`, data);
  }

  patchPassages(data: any) {
    console.log(data);
    return this.http.patch(`${this.apiBaseUrl}/floor/patchPassages`, data);
  }

  ListFloorsFromBuildingComponent(buildingId: string) {
    const requestBody = { buildingId: buildingId };
    return this.http.post<Floor[]>(this.apiBaseUrl + "/floor/listBuildingsByFloors", requestBody);
  }

  listFloors(): Observable<floor[]> {
    return this.http.get<floor[]>(`${this.apiBaseUrl}/floor/list`);
  }

  listPassagesBetweenBuildings(buildingId1: string, buildingId2: string): Observable<Floor[]> {
    const requestBody = { buildingId1, buildingId2 };

    return this.http.post<Floor[]>(`${this.apiBaseUrl}/floor/listPassagesBetweenBuildings`, requestBody);
  }
}