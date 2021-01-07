import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() public sideNavigationToogle = new EventEmitter();

  constructor(private apiService: ApiService, private httpClient: HttpClient, private router: Router) {
    this.apiService.authenticate({}, () => {});
   }

  ngOnInit(): void {
  }

  public onToggleSideNavigation = () => {
    this.sideNavigationToogle.emit();
  }

  public logout() {
    this.httpClient.post('logout', {}).pipe(finalize(() => {
      this.apiService.isAuthenticated = false;
      this.router.navigateByUrl('/login');
    })).subscribe();
  }

  public authenticated() {
    return this.apiService.isAuthenticated;
  }

}
