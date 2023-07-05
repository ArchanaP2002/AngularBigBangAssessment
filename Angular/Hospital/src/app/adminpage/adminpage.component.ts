import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface DoctorDetails {
  id: number;
  name: string;
  specialization: string;
  imgPath: string;
}

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
  flag: boolean = false;
  flaguser: boolean = false;
  doctorList: DoctorDetails[] = [];
  newDoctor: DoctorDetails = {
    id: 0,
    name: '',
    specialization: '',
    imgPath: ''
  };
  isFormVisible: boolean = false;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("role") == "Admin") {
      this.flag = true;
    }
  }

  ngOnInit(): void {
    this.getDoctorList();
  }

  toggleForm(): void {

    let popup = document.getElementById('popupAdded');
      popup?.classList.add('open');
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File): void {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
  }

  addOrUpdateDoctor(): void {
    if (this.newDoctor.id) {
   
      this.updateDoctorInDatabase();
    } else {
   
      this.addDoctorToDatabase();
    }
  }
  closePopupAr() {
    let popup = document.getElementById('popupAdded');
    popup?.classList.remove('open');
  }
  updateDoctorInDatabase(): void {
    this.newDoctor.imgPath = this.selectedImage as string || '';
    this.http.put(`https://localhost:7120/api/DoctorDetails/${this.newDoctor.id}`, this.newDoctor)
      .subscribe(() => {
        console.log('Doctor updated successfully.');
        this.getDoctorList();
        this.resetForm();
      }, error => {
        console.log('Error occurred while updating the doctor:', error);
      });
  }

  addDoctorToDatabase(): void {
    this.newDoctor.imgPath = this.selectedImage as string || '';
    this.http.post('https://localhost:7120/api/DoctorDetails', this.newDoctor)
      .subscribe(() => {
        console.log('Doctor added successfully.');
        this.getDoctorList();
        this.resetForm();
        window.location.reload()
      }, error => {
        console.log('Error occurred while adding a doctor:', error);
      }
      );
      alert("Data Added")

  }

  getDoctorList(): void {
    this.http.get<DoctorDetails[]>('https://localhost:7120/api/DoctorDetails')
      .subscribe(response => {

        this.doctorList = response;
      }, error => {
        console.log('Error occurred while retrieving doctor list:', error);
      });
  }

  updateDoctor(doctor: DoctorDetails): void {
  
    this.isFormVisible = true;

 
    this.newDoctor = { ...doctor };

 
    this.selectedImage = this.newDoctor.imgPath;
  }

  deleteDoctor(doctor: DoctorDetails): void {
    const index = this.doctorList.indexOf(doctor);
    if (index > -1) {
 
      this.doctorList.splice(index, 1);

 
      this.http.delete(`https://localhost:7120/api/DoctorDetails/${doctor.id}`)
        .subscribe(() => {
          console.log('Doctor deleted successfully.');
        }, error => {
          console.log('Error occurred while deleting the doctor:', error);
        });
    }
  }


  resetForm(): void {
    this.newDoctor = {
      id: 0,
      name: '',
      specialization: '',
      imgPath: ''
    };
    this.selectedImage = null;
    this.isFormVisible = false;
  }
}
