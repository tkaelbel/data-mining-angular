import { Component, OnInit } from '@angular/core';
import { Algorithms, IAlgorithm, IGeneralCollectionData } from '../models/databases.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-apriori',
  templateUrl: './apriori.component.html',
  styleUrls: ['./apriori.component.scss']
})
export class AprioriComponent implements OnInit {

  public passedData: any;
  public textAreaText: string = "Selected data: \n\n";
  public form: IAprioriInput = {};

  private initialData: string = "";

  private generalCollectionData: IGeneralCollectionData = {};

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    const passedData: Array<any> = history.state.data;
    this.generalCollectionData = history.state.collectionInfo;

    if (passedData) {
      passedData.forEach((data: any) => {
        this.textAreaText = `${this.textAreaText} ${data} \n`;
        this.initialData = this.textAreaText;
      });
    }

  }

  onSubmit(): void {
    const algorithm: IAlgorithm = {
      name: Algorithms.Apriori,
      properties: this.form,
      collectionName: this.generalCollectionData.collectionName,
      databaseName: this.generalCollectionData.databaseName,
      columnName: this.generalCollectionData.columnName
    }

    // this.dataService.executeAlgorithm(algorithm).subscribe((data: any) => {
    //   this.textAreaText = `${this.textAreaText} \n ${data.result}`;
    // });
    this.dataService.executeAlgorithmStream(algorithm).subscribe((data: any) => {
      this.textAreaText = `${this.textAreaText} \n ${data.output}`;
    });
  }

  public clear(): void {
    this.textAreaText = this.initialData;
  }

}

export interface IAprioriInput {
  minimumSupport?: number;
  minimumConfidence?: number;
  itemCount?: number;
}
