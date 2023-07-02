import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.component.html',
  styleUrls: ['./specialist.component.css']
})
export class SpecialistComponent implements OnInit {
  flag:boolean = false;
  doctorList: any[];
  specializationFilter: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("role")=="Admin")
    {
      this.flag=true;
    }
    // if (localStorage.getItem("role")=="Doctor")
    // {
    //   this.flag=true;
    // }
    
  }

  ngOnInit() {
    this.fetchDoctorList();
  }

  fetchDoctorList() {
    let url = 'https://localhost:7120/api/DoctorDetails';

    // Apply specialization filter if specified
    if (this.specializationFilter) {
      url += '/filter?specialization=' + this.specializationFilter;
    }

    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.doctorList = data;
      },
      (error) => {
        console.log('Error fetching doctor list:', error);
      }
    );
  }

  applyFilter() {
    this.fetchDoctorList();
  }

  // Other component methods
}
