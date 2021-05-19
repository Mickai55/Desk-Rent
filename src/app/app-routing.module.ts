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
import { RequestsComponent } from './pages/admin/requests/requests.component';
import { RolesComponent } from './pages/admin/roles/roles.component';
import { PublicGuard } from './guards/public.guard';
import { PrivateGuard } from './guards/private.guard';

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
    component: CreateDeskRoomComponent,
    canActivate: [PublicGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [PublicGuard]
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [PublicGuard]
  },
  {
    path: 'send-request',
    component: SendRentRequestComponent,
    canActivate: [PublicGuard]
  },
  {
    path: 'requests',
    component: RequestsComponent,
    canActivate: [PublicGuard, PrivateGuard] 
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [PublicGuard, PrivateGuard]
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
