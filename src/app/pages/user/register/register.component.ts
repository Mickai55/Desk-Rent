import { Component, OnInit } from '@angular/core';
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
  public pressed = false;
  constructor(private mainService: MainService,
    private router: Router ) {}

  ngOnInit(): void {}

  register() {
    this.pressed = true;
    this.passEqual = this.user.password == this.user.confirmPassword;

    if (
      this.passEqual &&
      this.allFieldsRequired()
    ) {
      this.mainService.register(this.user).subscribe((response) => {
        this.router.navigate(['/login'])
        .then(() => {
          window.location.reload();
        });
      });
    }
  }

  allFieldsRequired() {
    const { username, password, confirmPassword } = this.user;
    if (username == undefined || password == undefined || confirmPassword == undefined)
      return false;
    return true;
  }
}
