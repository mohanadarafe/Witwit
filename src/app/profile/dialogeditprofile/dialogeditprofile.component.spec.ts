import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogeditprofileComponent } from './dialogeditprofile.component';

describe('DialogeditprofileComponent', () => {
  let component: DialogeditprofileComponent;
  let fixture: ComponentFixture<DialogeditprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogeditprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogeditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
