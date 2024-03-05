import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-all-borrowers',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './view-all-borrowers.component.html',
  styleUrl: './view-all-borrowers.component.css'
})
export class ViewAllBorrowersComponent implements OnInit {
  public userList: any = {};

  public selectedUser: any = {
    "id": null,
    "firstName": null,
    "lasttName": null,
    "userName": null,
    "email": null,
    "address": null,
    "address2": null,
    "country": null,
    "phoneNummber": null
  }

  private baseUrl:string = 'http://localhost:8081'

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get("http://localhost:8081/user/get-all").subscribe((res: any) => {
      console.log(res);
      this.userList = res;
    })
  }

  deleteUser() { 
    let api = ""
  }
  saveUser() { }


}
