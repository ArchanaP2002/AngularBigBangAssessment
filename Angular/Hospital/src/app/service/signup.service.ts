import { HttpClient } from "@angular/common/http";
import { registerModel } from "../register/model/register.model";
import { UserDTOModel } from "../register/model/userDTO.model";
import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from '../appointment/appointment.model';

@Injectable()
export class SignupService{


    private formDetailsSubject = new BehaviorSubject<any>(null);
  formDetails$ = this.formDetailsSubject.asObservable();

  setFormDetails(details: any) {
    this.formDetailsSubject.next(details);
  }
    private baseUrl = 'https://localhost:7120/api/Patient';
    
    constructor(private httpClient:HttpClient)
    {

    }
    saveAppointment(appointment: Appointment): Observable<Appointment> {
        return this.httpClient.post<Appointment>(this.baseUrl, appointment);
      }

    signup(register:registerModel){
        console.log("register in servive")
        return this.httpClient.post("https://localhost:7120/api/User/Register",register);
    }

    userLogin(userDTO:UserDTOModel){
        return this.httpClient.post("https://localhost:7120/api/User/Login",userDTO);
    }
    
}