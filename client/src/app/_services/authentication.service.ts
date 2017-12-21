import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { API } from '../_config/api';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login (username: string, password: string) : Observable<any> {
    return this.http
      .post<any>(API.url('/api/auth/login'), { username, password })
      .map(response => {
        if (response && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
        }
        return response;
      });
  }

  logout () : void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() : any {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.user;
  }
}
