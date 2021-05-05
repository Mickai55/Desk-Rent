import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { RentComponent } from './pages/renting/rent/rent.component';
import { DeskRoomComponent } from './pages/renting/desk-room/desk-room.component';
import { CreateDeskRoomComponent } from './pages/renting/create-desk-room/create-desk-room.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { HistoryComponent } from './pages/user/history/history.component';
import { SendRentRequestComponent } from './pages/user/send-rent-request/send-rent-request.component'; 
import { HistoryAllComponent } from './pages/admin/history-all/history-all.component';

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
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'send-request',
    component: SendRentRequestComponent
  },
  {
    path: 'history-all',
    component: HistoryAllComponent
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
