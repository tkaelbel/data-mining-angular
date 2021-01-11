import { Component, OnInit } from '@angular/core';
import { ICollectionData, IDatabaseModel, IKeyValue } from '../models/databases.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.scss']
})
export class DatabasesComponent implements OnInit {

  public databases: Array<IDatabaseModel> = [];

  public dataSource: Array<any> = [];
  public columns: string[] = [];
  public firstCollection!: string;

  public collectionData: ICollectionData = {};

  constructor(private dataService: DataService) {
    this.dataService.getDatabases().subscribe((data) => {
      this.databases = data;

      if (this.databases.length === 0) return;

      const firstElement = this.databases[0];
      const firstDatabaseName = !firstElement.databaseName ? '' : firstElement.databaseName;
      this.firstCollection = !firstElement.collections ? '' : firstElement.collections[0];
      this.dataService.getCollectionData(firstDatabaseName, this.firstCollection).subscribe((data: ICollectionData) => {
        if (data.data) {
          data.data.forEach((keyValueArray: IKeyValue[]) => {
            const row: any = {};
            keyValueArray.forEach((keyValue: IKeyValue) => {
              row[keyValue.key as string] = keyValue.value;
            });
            this.dataSource.push(row);
          });
        }

        if (data.columns)
          this.columns = data.columns;
      })
    });

  }



  ngOnInit(): void {
  }

}
