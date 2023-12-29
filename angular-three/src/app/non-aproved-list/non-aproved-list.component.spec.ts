import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAprovedListComponent } from './non-aproved-list.component';

describe('NonAprovedListComponent', () => {
  let component: NonAprovedListComponent;
  let fixture: ComponentFixture<NonAprovedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonAprovedListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NonAprovedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
