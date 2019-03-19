import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';

// describe('ProfileService', () => {
//   beforeEach(() => TestBed.configureTestingModule({imports:[BrowserModule,//was CommonModule
//     ReactiveFormsModule, //was FormsModule
//     FormsModule,
//     ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
//     BrowserAnimationsModule, // required animations module
//     RouterTestingModule,
//   HttpClientModule,
//     ToastrModule.forRoot({
//       timeOut: 3000,
//       easeTime: 300,
//       positionClass: 'toast-bottom-center',
//       preventDuplicates: true,
//         })],}));

//   it('should be created', () => {
//     const service: ProfileService = TestBed.get(ProfileService);
//     expect(service).toBeTruthy();
//   });
// });
