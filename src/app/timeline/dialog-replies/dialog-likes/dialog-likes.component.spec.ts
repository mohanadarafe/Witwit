import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLikesComponent } from './dialog-likes.component';

describe('DialogLikesComponent', () => {
  let component: DialogLikesComponent;
  let fixture: ComponentFixture<DialogLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
