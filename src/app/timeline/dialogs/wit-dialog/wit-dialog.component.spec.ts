import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WitDialogComponent } from './wit-dialog.component';

describe('WitDialogComponent', () => {
  let component: WitDialogComponent;
  let fixture: ComponentFixture<WitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
