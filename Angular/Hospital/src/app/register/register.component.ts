import { Component, OnInit, ViewChild } from '@angular/core';
import { LoggedInUserModel } from './model/loggedinuser.model';
import { Router } from '@angular/router';
import { SignupService } from '../service/signup.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
// import validation from '../helper/validation';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('register_form') registerForm: NgForm;
  showError: boolean = false;
  registration_status = false;
  registration_status1 = false;
  public signup_form!:FormGroup;

   register!:any;

  loggedInUser:LoggedInUserModel;

  constructor(private router :Router , private signupService : SignupService, private fb:FormBuilder)
  {
    // this.register = new registerModel();
    this.register =
    {
      name:"",
      email:"",
      role: "",
      password: "",
      hashKey: "",
      passwordClear: "",
      specialization_Name:""
      
    }
    
    this.loggedInUser=new LoggedInUserModel();

  }

ngOnInit() {
  this.signup_form = this.fb.group({
    username:['', Validators.required]
  })
}

 
  
  onPost(){
  if(this.register.role === 'Doctor'){
    this.signupService.setFormDetails(this.register);
    console.log("Request is submited")
    this.registration_status1 = true;
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 2000);
  }
  else{
    this.signupService.signup(this.register).subscribe(data=>{
            console.log("register in component")
            this.loggedInUser = data as LoggedInUserModel;
            console.log(this.loggedInUser);
            
            localStorage.setItem("token",this.loggedInUser.token);
            localStorage.setItem("email",this.loggedInUser.email);
            localStorage.setItem("role",this.loggedInUser.role);
            this.registration_status = true;
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 3000);
           
          },
          err=>{
            console.log(err)
          });
  }
    
    
  }

  login_here()
  {
    this.router.navigateByUrl('login');
  }
}


export class registerModel
{

         name:string="";
         email:string="";
         role: string="";
         password: string="";
         hashKey: string="";
         passwordClear: string="";
         specialization_Name:string=""

}