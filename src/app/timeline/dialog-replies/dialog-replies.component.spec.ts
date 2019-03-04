import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRepliesComponent } from './dialog-replies.component';

describe('DialogRepliesComponent', () => {
  let component: DialogRepliesComponent;
  let fixture: ComponentFixture<DialogRepliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRepliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
