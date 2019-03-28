import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-wit-dialog',
  templateUrl: './wit-dialog.component.html',
  styleUrls: ['./wit-dialog.component.css']
})
export class WitDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<WitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    console.log(data);
  }

  ngOnInit() {}
}
