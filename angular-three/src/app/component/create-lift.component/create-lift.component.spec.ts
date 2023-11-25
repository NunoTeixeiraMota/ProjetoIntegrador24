import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateLiftComponent } from './create-lift.component';
import { LiftService } from '../../service/Lift/lift.service';
import { BuildingService } from 'src/app/service/Building/building.service';
import { of, throwError } from 'rxjs';
import Building from 'src/app/model/building';

describe('CreateLiftComponent', () => {
  let component: CreateLiftComponent;
  let fixture: ComponentFixture<CreateLiftComponent>;
  let mockLiftService: jasmine.SpyObj<LiftService>;
  let mockBuildingService: jasmine.SpyObj<BuildingService>;

  beforeEach(async () => {
    mockLiftService = jasmine.createSpyObj('LiftService', ['createLift']);
    mockBuildingService = jasmine.createSpyObj('BuildingService', ['getBuildings']);

    await TestBed.configureTestingModule({
      declarations: [ CreateLiftComponent ],
      providers: [
        { provide: LiftService, useValue: mockLiftService },
        { provide: BuildingService, useValue: mockBuildingService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBuildings on init', () => {
    const buildings: Building[] = [];
    mockBuildingService.getBuildings.and.returnValue(of(buildings));
    component.ngOnInit();
    expect(mockBuildingService.getBuildings).toHaveBeenCalled();
    expect(component.buildings).toEqual(buildings);
  });

  it('should handle errors while fetching buildings', () => {
    const error = new Error('Error fetching buildings');
    mockBuildingService.getBuildings.and.returnValue(throwError(error));
    component.ngOnInit();
    expect(mockBuildingService.getBuildings).toHaveBeenCalled();
  });

  it('should create lift', () => {
    const liftData = { localization: '', state: '', building: '' };
    const response = { message: 'Lift created' };
    mockLiftService.createLift.and.returnValue(of(response));
    component.createLift();
    expect(mockLiftService.createLift).toHaveBeenCalledWith(liftData);
  });

  it('should handle errors while creating lift', () => {
    const error = new Error('Error creating lift');
    mockLiftService.createLift.and.returnValue(throwError(error));
    component.createLift();
    expect(mockLiftService.createLift).toHaveBeenCalled();
  });
});
