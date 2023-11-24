import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { of, throwError } from 'rxjs';
import { PatchPassagesComponent } from './patch-passages.component';

describe('PatchPassagesComponent', () => {
  let component: PatchPassagesComponent;
  let fixture: ComponentFixture<PatchPassagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PatchPassagesComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatchPassagesComponent);
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
      passages: ['a', 'b', 'c'],
    };

    const fakeService = jasmine.createSpyObj('FloorService', ['patchPassages']);
    fakeService.patchPassages.and.returnValue(of({
      data: {
        status: 200,
        body: floor
      },
      error: {
        status: 404,
      }
    }));

    component = new PatchPassagesComponent(fakeLocation, fakeService, fakeMessageService);
    component.floor.id = "1";
    component.floor.passages = ['a', 'b', 'c'];

    component.patchFloorPassages();

    expect(fakeService.patchPassages).toHaveBeenCalled();
    expect(component.finalMessage).toBe("Floor passages created/updated with success!");
  });

  it('should fail creation', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    const fakeService = jasmine.createSpyObj('FloorService', ['patchPassages']);
    fakeService.patchPassages.and.returnValue(throwError({
      error: {
        status: 400,
        message: "error"
      }
    }));

    component = new PatchPassagesComponent(fakeLocation, fakeService, fakeMessageService);

    component.patchFloorPassages();

    expect(fakeService.patchPassages).toHaveBeenCalled();
    expect(component.finalMessage).toBe("error");
  });
});
