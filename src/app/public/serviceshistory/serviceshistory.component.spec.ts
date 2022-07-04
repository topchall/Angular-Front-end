import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceshistoryComponent } from './serviceshistory.component';

describe('ServiceshistoryComponent', () => {
  let component: ServiceshistoryComponent;
  let fixture: ComponentFixture<ServiceshistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceshistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
