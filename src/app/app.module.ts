import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MarkerService } from './services/marker.service';
import { PopupService } from './services/popup.service';        
import { MapComponent } from './mapGetLocation/map.component';
import { Map2Component } from './mapPutLocation/map2.component';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { RentComponent } from './pages/renting/rent/rent.component';
import { DeskRoomComponent } from './pages/renting/desk-room/desk-room.component';
import { CreateDeskRoomComponent } from './pages/renting/create-desk-room/create-desk-room.component';
import { ProfileComponent } from './pages/user/profile/profile.component'; 
import { HistoryComponent } from './pages/user/history/history.component';
import { SendRentRequestComponent } from './pages/user/send-rent-request/send-rent-request.component'; 

@NgModule({
  declarations: [  
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RentComponent,
    DeskRoomComponent,
    CreateDeskRoomComponent,
    MapComponent,
    Map2Component,
    ProfileComponent,
    HistoryComponent,
    SendRentRequestComponent,
  ],
  imports: [    
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    BrowserAnimationsModule,
    CarouselModule, // for root?
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    MatTooltipModule,
    DragDropModule,
    NgbModule,
    MatMenuModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule
  ],
  providers: [
    RentComponent, 
    MarkerService,
    PopupService,
    MapComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
