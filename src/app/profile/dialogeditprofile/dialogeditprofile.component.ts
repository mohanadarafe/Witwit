import { Component, OnInit } from '@angular/core';
import { ProfileService } from "../services/profile.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-dialogeditprofile',
  templateUrl: './dialogeditprofile.component.html',
  styleUrls: ['./dialogeditprofile.component.css']
})
export class DialogeditprofileComponent implements OnInit {
  faTimes = faTimes;

  constructor( private profileService: ProfileService, private dialogRef: MatDialogRef<DialogeditprofileComponent>,) { }

  ngOnInit() {
  }

  showAll(){}

  close() {
    this.dialogRef.close();
  }

}
