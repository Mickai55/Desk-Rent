import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public serverError: boolean = false;
  public submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private mainService: MainService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  doLogin() {
    console.log(this.loginForm);
    this.submitted = true;
    this.serverError = false;

    if (this.loginForm.status === 'VALID') {
      this.mainService.login(this.loginForm.value).subscribe(
        (res) => {},
        (err) => {
          if (err) {
            this.serverError = true;
          }
        }
      );
    }
  }

  get f() {
    return this.loginForm.controls;
  }

}
