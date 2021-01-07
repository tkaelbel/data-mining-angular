import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public credentials: ICredentials = {username: '', password: ''};

  constructor(private app: ApiService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  public login(){
    this.app.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/');
    });
    return false;
  }

}

export interface ICredentials {
  username?: string;
  password?: string;
}
