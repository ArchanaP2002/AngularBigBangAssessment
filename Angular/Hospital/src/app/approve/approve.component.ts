import { Component,OnInit } from '@angular/core';
import { SignupService } from '../service/signup.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit{

  flag:boolean = false;

  formDetails:any;
  showFormDetails=true;
  ngOnInit() {
    this.signupService.formDetails$.subscribe(details => {
      this.formDetails = details;
      this.showFormDetails = !!this.formDetails;
    });
  }
constructor(private signupService: SignupService,private http:HttpClient){
  if (localStorage.getItem("role")=="Admin")
  {
    this.flag=true;
  }
  if (localStorage.getItem("role")=="Doctor")
  {
    this.flag=true;
  }
}

approveForm() {
   
  this.http.post<any>('https://localhost:7120/api/User/Register', this.formDetails)
    .subscribe(response => {
      console.log(response);

      this.signupService.setFormDetails(null);
      this.showFormDetails = false;
    }, error => {
      console.error(error);
    });
}
 declineForm() {
  this.signupService.setFormDetails(null);
  this.showFormDetails = false;
}
}
