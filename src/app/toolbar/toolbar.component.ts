import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() public sideNavigationToogle = new EventEmitter();

  isLoggedIn$!: Observable<boolean>;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.tokenStorageService.isLoggedIn;
  }

  public onToggleSideNavigation = () => {
    this.sideNavigationToogle.emit();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
