import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { DialogprofileComponent } from './dialogprofile.component';

describe('DialogprofileComponent', () => {
  let component: DialogprofileComponent;
  let fixture: ComponentFixture<DialogprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
