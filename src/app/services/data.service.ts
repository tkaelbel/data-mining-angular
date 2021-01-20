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

  public getDatabases(): Observable<any> {
    return this.httpClient.get(DATA_API + 'databases', httpOptions);
  }

  public getCollectionData(databaseName: string, collectionName: string): Observable<any> {
    return this.httpClient.get(DATA_API + 'collectionData', {
      headers: httpOptions.headers,
      params: {
        databaseName: databaseName,
        collectionName: collectionName
      }
    });
  }

  public getAlgorithmNames(): Observable<any> {
    return this.httpClient.get(DATA_API + 'algorithmNames', {
      headers: httpOptions.headers
    });
  }


}
