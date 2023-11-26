import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { FloorService } from 'src/app/service/Floor/floor.service';
import { EditFloorComponent } from './edit-floor.component';
import Floor from 'src/app/model/floor';
import Building from 'src/app/model/building';

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

  it('should call edit passages and return floor data', () => {
    const mockBuilding: Building = {
      _id: "1",
      name: "a",
      localizationoncampus: "a",
      floors: 3,
      lifts: 3,
      maxCel: [3,2]
    };

    const mockFloor: Floor = {
      "_id": "b",
      "name": 'a',
      "building": mockBuilding,
      "description": 'a',
      "hall": 'a',
      "room": 2,
      "floorMap": 'a',
      "hasElevator": false,
      "passages": []
    }
    spyOn(floorService, 'editFloor').and.returnValue(of(mockFloor));
    component.editFloor();
    expect(floorService.patchPassages).toHaveBeenCalledWith(mockFloor);
  });

  it('should handle error on editFloor', () => {
    spyOn(floorService, 'editFloor').and.returnValue(throwError(() => new Error('Error')));
    component.editFloor();
  });
});
