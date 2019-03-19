import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBar, MatSnackBarModule, MatDialogModule } from '@angular/material';

// describe('ProfileComponent', () => {
//   let component: ProfileComponent;
//   let fixture: ComponentFixture<ProfileComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ ProfileComponent ],
//       schemas: [
//         CUSTOM_ELEMENTS_SCHEMA,
//         NO_ERRORS_SCHEMA
//       ],
//       imports:[BrowserModule,//was CommonModule
//         ReactiveFormsModule, //was FormsModule
//         FormsModule,
//         ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
//         BrowserAnimationsModule, // required animations module
//         RouterTestingModule,
//       HttpClientModule,
//         ToastrModule.forRoot({
//           timeOut: 3000,
//           easeTime: 300,
//           positionClass: 'toast-bottom-center',
//           preventDuplicates: true,
//             }),
//           MatSnackBarModule,
//         MatDialogModule],
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProfileComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
