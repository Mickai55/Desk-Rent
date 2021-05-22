import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DragDropModule } from '@angular/cdk/drag-drop';  
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';  
        
// Angular Material
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Mat-Table
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';  
import { MatPaginatorModule } from '@angular/material/paginator';

// Leaflet Map
import { MarkerService } from './services/marker.service';
import { PopupService } from './services/popup.service';        
import { MapComponent } from './mapGetLocation/map.component';
import { Map2Component } from './mapPutLocation/map2.component';

// Components
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { RentComponent } from './pages/renting/rent/rent.component';
import { DeskRoomComponent } from './pages/renting/desk-room/desk-room.component';
import { CreateDeskRoomComponent } from './pages/renting/create-desk-room/create-desk-room.component';
import { ProfileComponent } from './pages/user/profile/profile.component'; 
import { HistoryComponent } from './pages/user/history/history.component';
import { SendRentRequestComponent } from './pages/user/send-rent-request/send-rent-request.component'; 
import { MatSelectModule } from '@angular/material/select';
import { RequestsComponent } from './pages/admin/requests/requests.component';
import { RolesComponent } from './pages/admin/roles/roles.component';
          
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
    RequestsComponent,
    RolesComponent, 
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
    CarouselModule,
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
    MatProgressBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule
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
