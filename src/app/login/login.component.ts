import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { AlertModule } from 'ng-bootstrap/components/alert';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
