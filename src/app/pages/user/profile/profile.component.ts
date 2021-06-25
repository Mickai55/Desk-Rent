import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/interfaces/user';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private mainService: MainService,
    private notifierService: NotifierService
  ) {}
  user: User = { _id: 0, username: '', email: '', phone: '', location: '', website_link: '', request_count: 0, photo: '', userType: 'normal'};
  role = localStorage.getItem('role');

  ngOnInit() {
    this.mainService
    .getLoggedUser(localStorage.getItem('username'))
    .subscribe((response) => {
      this.user = JSON.parse(JSON.stringify(response));
      console.log(response);
      
      if (this.user.photo == null) {
        this.user.photo =
          'https://bootdey.com/img/Content/avatar/avatar6.png';
      }
    });
  }

  @ViewChild('img') img;

  saveChanges() {
    this.mainService.updateUser(this.user).subscribe();
    this.notifierService.notify('success', 'The profile was updated!');
  }

  changePhoto() {
    this.img.nativeElement.click();
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.user.photo = event.target.result;
      };
    }
  }
}
