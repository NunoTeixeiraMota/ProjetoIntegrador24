import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs'; 
import { FloorService } from 'src/app/service/Floor/floor.service';
import { PatchFloorMapComponent } from './patch-floor-map.component';

describe('PatchFloorMapComponent', () => {
  let component: PatchFloorMapComponent;
  let fixture: ComponentFixture<PatchFloorMapComponent>;
  let floorService: FloorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatchFloorMapComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [FloorService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(PatchFloorMapComponent);
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
      floorMap: ""
    });
  });

  it('should call patch floor map and return floor map data', () => {
    const response = { message: "Floor map updated with success!" };
    spyOn(floorService, 'patchFloorMap').and.returnValue(of(response));
    floorService.patchFloorMap(component.floor);
    expect(floorService.patchFloorMap).toHaveBeenCalledWith(component.floor);
  });

  it('should handle error on patchFloorMap', () => {
    spyOn(floorService, 'patchFloorMap').and.returnValue(throwError(() => new Error('Error')));
    component.editFloorMap();
  });
});
