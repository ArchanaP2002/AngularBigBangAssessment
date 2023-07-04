
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent  {
 
  public flag: boolean = false;
  public flaguser: boolean = false;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("role") == "Admin") {
      this.flag = true;
    }
    if (localStorage.getItem("role") == "Doctor") {
      this.flaguser = true;
    }
  }

 
}