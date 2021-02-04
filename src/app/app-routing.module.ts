import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RentComponent } from './pages/rent/rent.component';
import { DeskRoomComponent } from './pages/desk-room/desk-room.component';
import { CreateDeskRoomComponent } from './pages/create-desk-room/create-desk-room.component';

const routes : Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'rent',
    component: RentComponent
  },
  {
    path: 'deskRoom/:_id',
    component: DeskRoomComponent
  },
  {
    path: 'createDeskRoom',
    component: CreateDeskRoomComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
