import { Component, OnInit } from '@angular/core';
import { FloorService } from 'src/app/service/Floor/floor.service';
import Floor from 'src/app/model/floor'; 
import { BuildingService } from 'src/app/service/Building/building.service';
import Building from 'src/app/model/building';
import { MessageService } from 'src/app/service/message/message.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list-floors-from-building',
  templateUrl: 'list-floors-from-building.component.html',
  styleUrls: ['list-floors-from-building.component.css']
})
export class ListFloorsFromBuildingComponent implements OnInit {
  selectedBuildingId: string = '';
  Floors: Floor[] = [];
  buildings: Building[] = [];

  constructor(
    private floorService: FloorService,
    private buildingService: BuildingService,
    public messageService: MessageService,
    private titleService: Title
    ) {}

  ngOnInit() {
    this.getBuildings();
    this.titleService.setTitle('RobDroneGo: List Floors by Building');
  }

  listFloorsFromBuilding() {
    console.log(this.selectedBuildingId)
    if (!this.selectedBuildingId) {
      this.messageService.add('Please select a building.'); 
      return;
    }

    this.floorService.ListFloorsFromBuildingComponent(this.selectedBuildingId)
      .subscribe(
        (data: Floor[]) => { 
          this.Floors = data;
        },
        error => {
          this.messageService.add("Error: listing floors ${error}")
        }
      );
  }

  getBuildings(): void {
    this.buildingService.getBuildings().subscribe(
      (buildings: Building[]) => {
        console.log('Fetched Buildings:', buildings);
        this.messageService.add('Buildings fetched with success!');
        this.buildings = buildings;
      },
      (error: any) => {
        if(error.code == 404) this.messageService.add("Error: No Connection to Server")
        this.messageService.add('Error fetching buildings . No Connection to Server');
      }
    );
  }
}
