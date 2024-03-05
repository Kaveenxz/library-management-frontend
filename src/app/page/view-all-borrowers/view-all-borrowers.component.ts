import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NavComponent } from "../../common/nav/nav.component";


@Component({
    selector: 'app-view-all-borrowers',
    standalone: true,
    templateUrl: './view-all-borrowers.component.html',
    styleUrl: './view-all-borrowers.component.css',
    imports: [HttpClientModule, FormsModule, CommonModule, NavComponent]
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
    this.http.get(this.baseUrl+"/user/get-all").subscribe((res: any) => {
      console.log(res);
      this.userList = res;
    })
  }

  deleteUser() { 
    this.http.delete(this.baseUrl+"/user/delete/"+this.selectedUser.id, {responseType:'text'}).subscribe((res:any) =>{
      console.log(res);
      this.loadUsers()
      Swal.fire({
        title: "Good job!",
        text: `${this.selectedUser.userName} user is deleted`,
        icon: "success"
      });
      this.selectedUser = null;

      
    })
  }
  saveUser() {
    this.http.post("http://localhost:8081/user/add-user/",this.selectedUser).subscribe((res:any)=>{
      this.loadUsers();
      Swal.fire({
        title: "Good job! Updated user",
        text: `${this.selectedUser.userName} user is Updated`,
        icon: "success"
      });
      this.selectedUser={};
    })
   }

  setSelectedUser(user:any){
    this.selectedUser=user;
    console.log(user);
    
  }

}
