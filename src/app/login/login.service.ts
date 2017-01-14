import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class LoginService {
 
  isLoggedIn: boolean = false;

  redirectUrl: string;


  private url = "http://akna.suprice.today:8009/api/users/";

  constructor(
    private http: Http
  ) { }




  login() {
    this.isLoggedIn = true;
    return this.isLoggedIn;
  }

  logout(): void {
    this.isLoggedIn = false;
  }



}
