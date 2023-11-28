import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs'; 
import { PatchPassagesComponent } from './patch-passages.component';
import { FloorService } from 'src/app/service/Floor/floor.service';

describe('PatchPassageComponent', () => {
  let component: PatchPassagesComponent;
  let fixture: ComponentFixture<PatchPassagesComponent>;
  let floorService: FloorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatchPassagesComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [FloorService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(PatchPassagesComponent);
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
      passages: [""]
    });
  });

  it('should call patch passages and return passages data', () => {
    const response = { message: 'Floor passages created/updated with success!' };
    spyOn(floorService, 'patchPassages').and.returnValue(of(response));
    floorService.patchPassages(component.floor);
    expect(floorService.patchPassages).toHaveBeenCalledWith(component.floor);
  });

  it('should handle error on patchPassages', () => {
    spyOn(floorService, 'patchPassages').and.returnValue(throwError(() => new Error('Error')));
    component.patchFloorPassages();
  });
});
