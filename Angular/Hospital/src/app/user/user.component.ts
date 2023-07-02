import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  

  patients: any[];
  swaggerUrl: string = 'https://localhost:7120/api/patient';
  flag: boolean = false;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("role") == "Admin") {
      this.flag = true;
    }
    if (localStorage.getItem("role") == "Doctor") {
      this.flag = true;
    }
  }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.http.get<any[]>(this.swaggerUrl).subscribe(
      (response) => {
        this.patients = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
}
