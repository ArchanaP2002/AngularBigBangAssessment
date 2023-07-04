import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupService } from '../service/signup.service';
import { Appointment } from './appointment.model';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
 
  appointmentData: Appointment = {
    id: 0,
    name: '',
    gender: '',
    age: 0,
    date: '',
    specialization: '',
    reason: ''
  };
  flag:boolean = false;
  flaguser:boolean = false;
  constructor(private signupService: SignupService) {
    if (localStorage.getItem("role")=="Admin")
    {
      this.flag=true;
    }
    if (localStorage.getItem("role")=="Doctor")
    {
      this.flaguser=true;
    }
    
  }

  registerAppointment(appointmentForm: NgForm): void {
    this.signupService.saveAppointment(this.appointmentData).subscribe(
      (response) => {
        // Reset the form after successful submission
        appointmentForm.resetForm();
        this.appointmentData = {
          id: 0,
          name: '',
          gender: '',
          age: 0,
          date: '',
          specialization: '',
          reason: ''
        };
     
      }
    );
  }
  
  /*
  registerAppointment(): void {
    this.signupService.saveAppointment(this.appointmentData).subscribe(
   
      (response) => {
        // console.log('Appointment registered successfully:', response);
        // Reset the form after successful submission
        this.appointmentData = {
          id: 0,
          name: '',
          gender: '',
          age: 0,
          date: '',
          specialization: '',
          reason: ''
        };
      },
      (error) => {
        console.error('Failed to register appointment:', error);
        console.log('Status:', error.status);
        console.log('Error message:', error.error);
      }
    );
  } */
}
