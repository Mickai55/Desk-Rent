import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user: any = {};
  public passEqual = true;
  public passReq = true;
  public pressed = false;
  public serverError: boolean = false;
  public registerForm: FormGroup;

  constructor(
    private mainService: MainService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  passRequirements(pass) {
    if (pass.length < 6)
      return false;
    if (pass === pass.toUpperCase() || pass === pass.toLowerCase())
      return false;
    if (/[^0-9]/.test(pass) == false)
      return false;

    return true; 
  }

  register() {
    this.pressed = true;

    let user = {
      username: this.registerForm.value.username, 
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
    };

    this.passEqual = user.password === user.confirmPassword;
    
    this.passReq = this.passRequirements(user.password);

    if (this.passReq && this.passEqual && this.registerForm.status === 'VALID') {
      this.mainService.register(user).subscribe(
        (res) => {
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      },
      (err) => {
        if (err) {
          this.serverError = true;
        }
      }
      );
    }
  }
}
