import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService, TokenService } from "@app/auth/services";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  usernameFormControl: FormControl;
  passwordFormControl: FormControl;

  constructor(private fb: FormBuilder, private authService: AuthenticationService,
              private tokenService: TokenService, private router: Router) {
    this.usernameFormControl = new FormControl('', [Validators.required]);
    this.passwordFormControl = new FormControl('', [Validators.required]);
    this.loginForm = this.fb.group({
      usernameFormControl: this.usernameFormControl,
      passwordFormControl: this.passwordFormControl
    });
  }

  ngOninit() {
  }

  onSubmit() {
    console.log();
    const username = this.usernameFormControl.value;
    const password = this.passwordFormControl.value;

    if (!(username && password)) {
      return;
    }

    this.authService.login(username, password)
      .subscribe(authResponse => {
        if (authResponse.result) {
          this.tokenService.save(authResponse.token);
          this.router.navigate(['management']);
        }
      });
  }

}