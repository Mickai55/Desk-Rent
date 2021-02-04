import { Component, OnInit } from '@angular/core';
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
  constructor(private mainService: MainService) {}

  ngOnInit(): void {}

  register() {
    this.pressed = true;
    this.passEqual = this.user.password == this.user.confirmPassword;

    if (
      this.passEqual &&
      this.validateEmail(this.user.email) &&
      this.allFieldsRequired()
    ) {
      this.mainService.registerDemoAPI(this.user).subscribe((response) => {
        console.log(response);
      });
    }
  }

  validateEmail(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  allFieldsRequired() {
    const { name, email, password, confirmPassword } = this.user;
    if (name == undefined || email == undefined || password == undefined || confirmPassword == undefined)
      return false;
    return true;
  }
}
