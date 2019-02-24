import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogprofileComponent } from './dialogprofile.component';

describe('DialogprofileComponent', () => {
  let component: DialogprofileComponent;
  let fixture: ComponentFixture<DialogprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
