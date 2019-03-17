import { TestBed } from '@angular/core/testing';

import { TimelineService } from './timeline.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule} from '@angular/material';
import {MatDialogModule, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// describe('TimelineService', () => {
//   beforeEach(() => TestBed.configureTestingModule({
//     imports:[BrowserModule,//was CommonModule
//       ReactiveFormsModule, //was FormsModule
//       FormsModule,
//       ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
//       BrowserAnimationsModule, // required animations module
//       RouterTestingModule,
//     HttpClientModule,
//       ToastrModule.forRoot({
//         timeOut: 3000,
//         easeTime: 300,
//         positionClass: 'toast-bottom-center',
//         preventDuplicates: true,
//           }),
//         MatSnackBarModule,
//       MatDialogModule],
//       providers: [
//         {provide: MatDialogRef, useValue: {}},{ provide: MAT_DIALOG_DATA, useValue: {} }
//      ]
//   }));

//   it('should be created', () => {
//     const service: TimelineService = TestBed.get(TimelineService);
//     expect(service).toBeTruthy();
//   });
// });
