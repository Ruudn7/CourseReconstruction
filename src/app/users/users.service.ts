import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';



@Injectable()
export class UsersService {


  private url = 'http://akna.surprice.today:8009/api/'

  constructor(private http: Http) { }

  getUsers() {

    return this.http.get(this.url + 'users')
    .map( (resonse: Response ) => resonse.json())
    .catch( this.handleError );
  }

    getUser(id) {

    return this.http.get(this.url + 'users' + id)
    .map( (resonse: Response ) => resonse.json())
    .catch( this.handleError );
  }


  private handleError( error: any){
    let msg = `Status code ${error.status} na url ${error.url}`;
    console.error(msg);
    return Observable.throw(msg);
  }

}