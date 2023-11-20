import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MessageService } from '../message/message.service';
import { of } from 'rxjs';
import { RobotService } from './Robot.service.service';
import robotType from 'src/app/model/robotType';

describe('RobotService', () => {
  let service: RobotService;

  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpClient = TestBed.get(HttpClient);
    service = TestBed.inject(RobotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create the robot type successfully', () => {
    let messageService: MessageService = TestBed.inject(MessageService);

    let rt: robotType = {
        id: "1",
        designation: "a",
        brand: "a",
        modelRobot: "a",
        task: 0
    };

    const fakeGet = jasmine.createSpyObj('HttpClient', ['post']);
    fakeGet.post.and.returnValue(of(new HttpResponse({
      body: rt
    })));

    service = new RobotService(fakeGet, messageService);

    let robotCreate = service.createRobot(rt);

    robotCreate.subscribe(response => expect(response.body).toBe(rt))
  })
});