import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { SpecialistComponent } from './specialist/specialist.component';
import { UserComponent } from './user/user.component';
import { ApproveComponent } from './approve/approve.component';

const routes: Routes = [
 
  {path:'register',component:RegisterComponent},
   {path:'login',component:LoginComponent},
  {path:'homepage',component:HomepageComponent},
  {path:'appointment', component:AppointmentComponent},
  {path: 'adminpage', component:AdminpageComponent},
  { path: 'doctordetails', component: SpecialistComponent},
  {path : 'user', component: UserComponent},
  {path : 'approve', component: ApproveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
