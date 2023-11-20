import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateBuildingComponent } from './update-building.component';
import { BuildingService } from '../../service/Building/building.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('UpdateBuildingComponent', () => {
  let component: UpdateBuildingComponent;
  let fixture: ComponentFixture<UpdateBuildingComponent>;
  let buildingService: BuildingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBuildingComponent ],
      imports: [ HttpClientTestingModule ], // Used to mock HttpClient
      providers: [ BuildingService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Get the injected BuildingService instance
    buildingService = TestBed.inject(BuildingService);
  });

  it('should update', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateBuilding and return building data', () => {
    const response = { message: 'Building updated successfully' };
    spyOn(buildingService, 'updateBuilding').and.returnValue(of(response));

    component.updateBuilding();

    expect(buildingService.updateBuilding).toHaveBeenCalled();
    // You can add more expectations here to check the behavior after the method is called
  });

  // Add more tests here to cover other aspects of your component
});

