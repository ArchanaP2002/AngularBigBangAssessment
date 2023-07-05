import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupService } from './service/signup.service';
import { AppointmentComponent } from './appointment/appointment.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { SpecialistComponent } from './specialist/specialist.component';
import { UserComponent } from './user/user.component';
import { ApproveComponent } from './approve/approve.component';
import { NgChartsModule } from 'ng2-charts';
import { CountComponent } from './count/count.component';
   
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomepageComponent,
    AppointmentComponent,
    AdminpageComponent,
    SpecialistComponent,
    UserComponent,
    ApproveComponent,
    CountComponent,
     
 
     
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
