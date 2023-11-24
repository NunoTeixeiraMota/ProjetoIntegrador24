import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { of, throwError } from 'rxjs';
import { PatchFloorMapComponent } from './patch-floor-map.component';

describe('PatchFloorMapComponent', () => {
  let component: PatchFloorMapComponent;
  let fixture: ComponentFixture<PatchFloorMapComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PatchFloorMapComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatchFloorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be successful created', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    let floor = {
      _id: "1",
      floorMap: 'a',
    };

    const fakeService = jasmine.createSpyObj('FloorService', ['patchFloorMap']);
    fakeService.patchFloorMap.and.returnValue(of({
      data: {
        status: 200,
        body: floor
      },
      error: {
        status: 404,
      }
    }));

    component = new PatchFloorMapComponent(fakeLocation, fakeService, fakeMessageService);
    component.floor.id = "1";
    component.floor.floorMap = "a";

    component.editFloorMap();

    expect(fakeService.patchFloorMap).toHaveBeenCalled();
    expect(component.finalMessage).toBe("Floor map updated with success!");
  });

  it('should fail creation', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    const fakeService = jasmine.createSpyObj('FloorService', ['patchFloorMap']);
    fakeService.patchFloorMap.and.returnValue(throwError({
      error: {
        status: 400,
        message: "error"
      }
    }));

    component = new PatchFloorMapComponent(fakeLocation, fakeService, fakeMessageService);

    component.editFloorMap();

    expect(fakeService.patchFloorMap).toHaveBeenCalled();
    expect(component.finalMessage).toBe("error");
  });
});
