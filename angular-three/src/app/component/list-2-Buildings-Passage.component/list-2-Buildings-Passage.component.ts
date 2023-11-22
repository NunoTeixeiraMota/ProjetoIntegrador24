import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../service/Building/building.service';
import Building from 'src/app/model/building';

@Component({
  selector: 'app-list-passage-2-buildings',
  templateUrl: './list-2-Buildings-Passage.component.html',
  styleUrls: ['./list-2-Buildings-Passage.component.css']
})
export class ListPassageBetween2BuildingsComponent implements OnInit {
    constructor(private buildingService: BuildingService) {}
   
      
}
