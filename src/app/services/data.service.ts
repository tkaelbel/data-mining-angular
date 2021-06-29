import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAprioriInput } from '../apriori/apriori.component';
import { IAlgorithm } from '../models/databases.model';

const DATA_API = 'http://localhost:8080/api/data/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

const httpOptionsStream = {
  headers: new HttpHeaders({ 'Content-Type': 'application/ndjson' })
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

  public executeAlgorithm(input: IAlgorithm): Observable<any> {
    return this.httpClient.post<IAprioriInput>(DATA_API + 'executeAlgorithm', input, httpOptions);
  }

  public executeAlgorithmStream(input: IAlgorithm): Observable<any> {
    return this.httpClient.post<IAprioriInput>(DATA_API + 'executeAlgorithmStream', input, httpOptions);
  }


}
