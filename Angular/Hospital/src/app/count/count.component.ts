import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {
  public doctorCount: number = 0;
  public userCount: number = 0;
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

  ngOnInit() {
    this.fetchCounts();
  }

  fetchCounts() {
    this.http.get<any>('https://localhost:7120/api/User/count').subscribe(data => {
      this.doctorCount = data.doctorCount;
      this.userCount = data.userCount;
      this.createChart();
    });
  }

  createChart() {
    const total = this.doctorCount + this.userCount;
    const doctorPercentage = (this.doctorCount / total) * 100;
    const userPercentage = (this.userCount / total) * 100;

    const canvas = document.getElementById('doctorCountChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Doctors', 'Users'],
        datasets: [{
          label: 'Percentage',
          data: [doctorPercentage, userPercentage],
          backgroundColor: [
            'rgba(75, 192, 192, 0.8)',
            'rgba(192, 75, 75, 0.8)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(192, 75, 75, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              callback: function (value: number) {
                return value + "%";
              }
            },
            grid: {
              color: '#e9ecef'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}
