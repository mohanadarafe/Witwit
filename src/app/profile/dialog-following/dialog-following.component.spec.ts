import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFollowingComponent } from './dialog-following.component';

describe('DialogFollowingComponent', () => {
  let component: DialogFollowingComponent;
  let fixture: ComponentFixture<DialogFollowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFollowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
