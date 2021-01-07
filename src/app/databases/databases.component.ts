import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.scss']
})
export class DatabasesComponent implements OnInit {

  public databases: any = {};

  constructor(private apiService: ApiService) { 
    this.apiService.getDatabases().subscribe((data) => {
      this.databases = data;
    });
  }

  ngOnInit(): void {
  }

}
