import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateBuildingComponent } from './create-building.component';
import { BuildingService } from '../../service/Building/building.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('CreateBuildingComponent', () => {
  let component: CreateBuildingComponent;
  let fixture: ComponentFixture<CreateBuildingComponent>;
  let buildingService: BuildingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBuildingComponent ],
      imports: [ HttpClientTestingModule ], // Used to mock HttpClient
      providers: [ BuildingService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Get the injected BuildingService instance
    buildingService = TestBed.inject(BuildingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createBuilding and return building data', () => {
    const response = { message: 'Building created successfully' };
    spyOn(buildingService, 'createBuilding').and.returnValue(of(response));

    component.createBuilding();

    expect(buildingService.createBuilding).toHaveBeenCalled();
    // You can add more expectations here to check the behavior after the method is called
  });

  // Add more tests here to cover other aspects of your component
});

