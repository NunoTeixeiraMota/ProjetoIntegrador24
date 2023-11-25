import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateBuildingComponent } from './create-building.component';
import { BuildingService } from '../../service/Building/building.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs'; 

describe('CreateBuildingComponent', () => {
  let component: CreateBuildingComponent;
  let fixture: ComponentFixture<CreateBuildingComponent>;
  let buildingService: BuildingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBuildingComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule // Add FormsModule here
      ],
      providers: [BuildingService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buildingService = TestBed.inject(BuildingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default buildingData values', () => {
    expect(component.buildingData).toEqual({
      name: '',
      localizationoncampus: '',
      floors: 0,
      lifts: 0,
      maxCel: [0, 0]
    });
  });

  it('should call createBuilding and return building data', () => {
    const response = { message: 'Building created successfully' };
    spyOn(buildingService, 'createBuilding').and.returnValue(of(response));
    component.createBuilding();
    expect(buildingService.createBuilding).toHaveBeenCalledWith(component.buildingData);
  });

  it('should handle error on createBuilding', () => {
    spyOn(buildingService, 'createBuilding').and.returnValue(throwError(() => new Error('Error')));
    component.createBuilding();
  });

  it('should add a max cell', () => {
    component.addMaxCel();
    expect(component.buildingData.maxCel.length).toBe(3);
  });

  it('should remove a max cell', () => {
    component.removeMaxCel(0);
    expect(component.buildingData.maxCel.length).toBe(1);
  });

});
