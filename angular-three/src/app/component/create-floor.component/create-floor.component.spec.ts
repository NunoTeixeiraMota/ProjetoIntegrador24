import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFloorComponent } from './create-floor.component';
import { FloorService } from '../../service/Floor/floor.service';
import { BuildingService } from 'src/app/service/Building/building.service';
import { MessageService } from '../../service/message/message.service';
import { of } from 'rxjs';

describe('CreateFloorComponent', () => {
  let component: CreateFloorComponent;
  let fixture: ComponentFixture<CreateFloorComponent>;
  let floorService: jasmine.SpyObj<FloorService>;
  let buildingService: jasmine.SpyObj<BuildingService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const floorSpy = jasmine.createSpyObj('FloorService', ['createFloor']);
    const buildingSpy = jasmine.createSpyObj('BuildingService', ['getBuildings']);
    const messageSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [ CreateFloorComponent ],
      providers: [
        { provide: FloorService, useValue: floorSpy },
        { provide: BuildingService, useValue: buildingSpy },
        { provide: MessageService, useValue: messageSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFloorComponent);
    component = fixture.componentInstance;
    floorService = TestBed.inject(FloorService) as jasmine.SpyObj<FloorService>;
    buildingService = TestBed.inject(BuildingService) as jasmine.SpyObj<BuildingService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBuildings on init', () => {
    buildingService.getBuildings.and.returnValue(of([]));
    component.ngOnInit();
    expect(buildingService.getBuildings).toHaveBeenCalled();
  });

  it('should call createFloor when form data is valid', () => {
    component.floorData = {
      building: 'Building 1',
      name: 'Floor 1',
      description: 'Description',
      hall: 'Hall 1',
      room: 1,
      floorMap: 'floorMap',
      hasElevator: false,
      passages: []
    };
    floorService.createFloor.and.returnValue(of({}));
    component.createFloor();
    expect(floorService.createFloor).toHaveBeenCalledWith(component.floorData);
  });

  it('should set error message when form data is invalid', () => {
    component.floorData = {
      building: '',
      name: '',
      description: '',
      hall: '',
      room: -1,
      floorMap: '',
      hasElevator: false,
      passages: []
    };
    component.createFloor();
    expect(component.errorMessage).toBe('Name cannot be empty.');
  });

  it('should update form data and isFormReadyToSubmit flag on handleUploadSuccess', () => {
    const filename = 'floorMap';
    component.handleUploadSuccess(filename);
    expect(component.floorData.floorMap).toBe(filename);
    expect(component.isFormReadyToSubmit).toBe(true);
  });

  // Add more tests as needed
});
