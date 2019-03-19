import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEngineComponent } from './search-engine.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material';

describe('SearchEngineComponent', () => {
  let component: SearchEngineComponent;
  let fixture: ComponentFixture<SearchEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchEngineComponent ],
      imports:[BrowserModule,//was CommonModule
        ReactiveFormsModule, //was FormsModule
        FormsModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        BrowserAnimationsModule, // required animations module
        RouterTestingModule,
      HttpClientModule,
        ToastrModule.forRoot({
          timeOut: 3000,
          easeTime: 300,
          positionClass: 'toast-bottom-center',
          preventDuplicates: true,
            }),
          MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
