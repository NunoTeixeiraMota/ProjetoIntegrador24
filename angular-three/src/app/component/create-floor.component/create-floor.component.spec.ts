import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFloorComponent } from './create-floor.component';
import { FloorService } from '../../service/Floor/floor.service';
import { BuildingService } from 'src/app/service/Building/building.service';
import { of, throwError } from 'rxjs';
import Building from 'src/app/model/building';

describe('CreateFloorComponent', () => {
  let component: CreateFloorComponent;
  let fixture: ComponentFixture<CreateFloorComponent>;
  let floorService: FloorService;
  let buildingService: BuildingService;

  beforeEach(() => {
    const floorServiceMock = jasmine.createSpyObj('FloorService', ['createFloor']);
    const buildingServiceMock = jasmine.createSpyObj('BuildingService', ['getBuildings']);

    TestBed.configureTestingModule({
      declarations: [CreateFloorComponent],
      providers: [
        { provide: FloorService, useValue: floorServiceMock },
        { provide: BuildingService, useValue: buildingServiceMock }
      ]
    });

    fixture = TestBed.createComponent(CreateFloorComponent);
    component = fixture.componentInstance;
    floorService = TestBed.inject(FloorService);
    buildingService = TestBed.inject(BuildingService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call createFloor method on form submission', () => {
    const mockBuildingData: Building = {
      _id: '1',
      name: 'Building 1',
      localizationoncampus: 'Campus A',
      floors: 5,
      lifts: 2,
      maxCel: [0, 0]
    };

    const mockFloorData = {
        name: 'Floor 1',
        building: mockBuildingData._id, // Use the building's ID or any appropriate property
        description: 'Floor Description',
        hall: 'Hall A',
        room: 1,
        floorMap: 'floor-map.jpg',
        hasElevator: true,
        passages: []
      };
      

    component.floorData = mockFloorData;

    spyOn(floorService, 'createFloor').and.returnValue(of({}));

    component.createFloor();

    expect(floorService.createFloor).toHaveBeenCalledWith(mockFloorData);
  });

  it('should handle error on createFloor and log the error', () => {
    const mockBuildingData: Building = {
      _id: '1',
      name: 'Building 1',
      localizationoncampus: 'Campus A',
      floors: 5,
      lifts: 2,
      maxCel: [0, 0]
    };

    const mockFloorData = {
        name: 'Floor 1',
        building: mockBuildingData._id, // Use the building's ID or any appropriate property
        description: 'Floor Description',
        hall: 'Hall A',
        room: 1,
        floorMap: 'floor-map.jpg',
        hasElevator: true,
        passages: []
      };
      

    component.floorData = mockFloorData;

    const error = 'Error creating floor';
    spyOn(floorService, 'createFloor').and.returnValue(throwError(error));

    spyOn(console, 'error');
    component.createFloor();

    expect(console.error).toHaveBeenCalledWith('Error:', error);
  });
});
