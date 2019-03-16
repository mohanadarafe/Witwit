import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInUserInfoComponent } from './logged-in-user-info.component';

describe('LoggedInUserInfoComponent', () => {
  let component: LoggedInUserInfoComponent;
  let fixture: ComponentFixture<LoggedInUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedInUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
