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
  public selectedCollection!: string;
  public selectedDatabase!: string;

  constructor(private dataService: DataService) {
    this.dataService.getDatabases().subscribe((data) => {
      this.databases = data;

      if (this.databases.length === 0) return;

      const firstElement = this.databases[0];
      this.selectedDatabase = !firstElement.databaseName ? '' : firstElement.databaseName;
      this.selectedCollection = !firstElement.collections ? '' : firstElement.collections[0];
      this.dataService.getCollectionData(this.selectedDatabase, this.selectedCollection).subscribe((data: ICollectionData) => {
        this.convertDataToDataSource(data);
      });
    });

  }

  public clickedExpansionPanelItem(databaseName: string | undefined, nameOfExpansionPanelItem: string): void {

    if(this.selectedCollection !== nameOfExpansionPanelItem || this.selectedDatabase !== databaseName){
      this.dataSource = [];
      this.selectedCollection = nameOfExpansionPanelItem;
      this.selectedDatabase = databaseName as string;
      this.dataService.getCollectionData(databaseName as string, nameOfExpansionPanelItem).subscribe((data: ICollectionData) => {
        this.convertDataToDataSource(data);
      });
    }

    
  }

  private convertDataToDataSource(data: ICollectionData): void {
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
  }



  ngOnInit(): void {
  }

}
