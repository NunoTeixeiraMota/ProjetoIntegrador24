import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { FloorService } from 'src/app/service/Floor/floor.service';
import { EditFloorComponent } from './edit-floor.component';

describe('EditFloorComponent', () => {
  let component: EditFloorComponent;
  let fixture: ComponentFixture<EditFloorComponent>;
  let floorService: FloorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFloorComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [FloorService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(EditFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    floorService = TestBed.inject(FloorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default floor values', () => {
    expect(component.floor).toEqual({
      id: "",
      name: '',
      building: "",
      description: '',
      hall: '',
      room: 0,
      floorMap: '',
      hasElevator: false,
      passages: [""]
    });
  });

  it('should call editFloor and return floor data', () => {
    const response = { message: 'Floor Updated with success!' };
    spyOn(floorService, 'editFloor').and.returnValue(of(response));
    floorService.editFloor(component.floor);
    expect(floorService.editFloor).toHaveBeenCalledWith(component.floor);
  });

  it('should handle error on editFloor', () => {
    spyOn(floorService, 'editFloor').and.returnValue(throwError(() => new Error('Error')));
    component.editFloor();
  });
});
