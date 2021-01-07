import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: IAuthentication = {
    username: undefined,
    password: undefined,
    email: undefined,
    repeatPassword: undefined
  } 
  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = false;

  hidePassword = true;
  hideRepeatPassword = true;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    const { username, email, password, repeatPassword } = this.form;


    if(password === repeatPassword){
      this.authService.register(username as string, email as string, password as string).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
  }

}

export interface IAuthentication {
  username?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
}
