import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'data-mining-angular';

  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService){

  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }
}
