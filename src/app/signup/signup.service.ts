import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Statics
import 'rxjs/add/observable/throw';
// Operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { NewUser } from './new-user';

@Injectable()
export class SignupService {
  baseUrl: string;
  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:5000';
  }

  createUser(user: NewUser): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.baseUrl}/api/signup`, user, options)
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        const data = error.json();
        const errMsg = (data.message) ? data.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
      });
  }
}