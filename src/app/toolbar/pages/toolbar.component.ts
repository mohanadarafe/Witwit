import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../shared/services/auth.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private _authService: AuthService) {}
  ngOnInit() {
  }

}
