import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const DATA_API = 'http://localhost:8080/api/data/';

const httpOptions = {
  headers: new HttpHeaders({ responseType: 'text' })
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public getDatabases(): Observable<any>{
    return this.httpClient.get(DATA_API + 'databases', httpOptions);
  }


}
