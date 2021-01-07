import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICredentials } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _isAuthenticated = false;

  public get isAuthenticated() {
    return this._isAuthenticated;
  }
  public set isAuthenticated(value) {
    this._isAuthenticated = value;
  }

  constructor(private httpClient: HttpClient) { }

  public getDatabases() {
    return this.httpClient.get("http://localhost:8080/databases");
  }

  public authenticate(credentials: ICredentials, callback: () => void) {

    if(!credentials.password) credentials.password = '';
    if(!credentials.username) credentials.username = '';
    const authorization = `Basic ${btoa(credentials.username + ':' + credentials.password)}`;

    const headers = new HttpHeaders(credentials ? {
      authorization: authorization
    } : {});

    this.httpClient.get("http://localhost:8080/login", { headers: headers }).subscribe(response => {
      const responseAny = response as any;
      this.isAuthenticated = responseAny['name'] ? true : false;
      return callback && callback();
    });
  }
}
