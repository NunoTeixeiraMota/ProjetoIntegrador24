import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPassageBetween2BuildingsComponent } from './list-2-Buildings-Passage.component';
import { BuildingService } from '../../service/Building/building.service';
import { FloorService } from 'src/app/service/Floor/floor.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Import FormsModule

describe('ListPassageBetween2BuildingsComponent', () => {
  let component: ListPassageBetween2BuildingsComponent;
  let fixture: ComponentFixture<ListPassageBetween2BuildingsComponent>;
  let mockBuildingService: jasmine.SpyObj<BuildingService>;
  let mockFloorService: jasmine.SpyObj<FloorService>;

  beforeEach(async () => {
    mockBuildingService = jasmine.createSpyObj('BuildingService', ['getBuildings']);
    mockFloorService = jasmine.createSpyObj('FloorService', ['ListFloorsFromBuildingComponent']);
    await TestBed.configureTestingModule({
      declarations: [ListPassageBetween2BuildingsComponent],
      imports: [FormsModule], // Add FormsModule to imports
      providers: [
        { provide: BuildingService, useValue: mockBuildingService },
        { provide: FloorService, useValue: mockFloorService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPassageBetween2BuildingsComponent);
    component = fixture.componentInstance;
    mockBuildingService.getBuildings.and.returnValue(of([]));
    mockFloorService.ListFloorsFromBuildingComponent.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBuildings on BuildingService when initializing', () => {
    expect(mockBuildingService.getBuildings).toHaveBeenCalled();
  });


});