import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateLiftComponent } from './create-lift.component';
import { LiftService } from '../../service/Lift/lift.service';
import { BuildingService } from 'src/app/service/Building/building.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { of, throwError } from 'rxjs';
import Building from 'src/app/model/building';
import Lift from 'src/app/model/lift';
const mockBuilding: Building = {
  _id: '1',
  name: 'Main Building',
  localizationoncampus: 'Central Campus',
  floors: 10,
  lifts: 3,
  maxCel: [100, 200, 300]
};

const mockBuildings: Building[] = [mockBuilding];

const mockLift: Lift = {
  id: 'lift1',
  localization: 'Ground Floor',
  state: 'Operational',
  building: mockBuilding
};

describe('CreateLiftComponent', () => {
  let component: CreateLiftComponent;
  let fixture: ComponentFixture<CreateLiftComponent>;
  let liftService: LiftService;
  let buildingService: BuildingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateLiftComponent],
      imports: [FormsModule,HttpClientTestingModule],
      providers: [LiftService, BuildingService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLiftComponent);
    component = fixture.componentInstance;
    liftService = TestBed.inject(LiftService);
    buildingService = TestBed.inject(BuildingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call getBuildings', () => {
    spyOn(component, 'getBuildings').and.callThrough();
    spyOn(buildingService, 'getBuildings').and.returnValue(of(mockBuildings));
    component.ngOnInit();
    expect(component.getBuildings).toHaveBeenCalled();
    expect(buildingService.getBuildings).toHaveBeenCalled();
    expect(component.buildings).toEqual(mockBuildings);
  });

  it('createLift should make a service call', () => {
    spyOn(liftService, 'createLift').and.returnValue(of(mockLift));
    component.createLift();
    expect(liftService.createLift).toHaveBeenCalledWith(component.liftData);
  });

  it('getBuildings should handle error', () => {
    const errorMessage = '';
    spyOn(buildingService, 'getBuildings').and.returnValue(throwError(() => new Error(errorMessage)));
    component.getBuildings();
  });

  it('should update model on input change', () => {
    const localizationInput = fixture.nativeElement.querySelector('#localization');
    localizationInput.value = '';
    localizationInput.dispatchEvent(new Event('input'));
    expect(component.liftData.localization).toEqual('New Location');
  });
  
  it('should update UI on successful lift creation', () => {
    spyOn(liftService, 'createLift').and.returnValue(of(mockLift));
    component.createLift();
    expect(component.finalMessage).toContain('');
  });

  it('should handle error on lift creation', () => {
    const errorMessage = '';
    spyOn(liftService, 'createLift').and.returnValue(throwError(() => new Error(errorMessage)));
    component.createLift();
    expect(component.finalMessage).toContain(errorMessage);
  });
  
});
