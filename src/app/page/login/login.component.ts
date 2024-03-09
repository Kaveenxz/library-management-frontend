import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj:any ={
    "email": "",
    "passWord": ""
  }

  constructor(private http: HttpClient, private router:Router){}

  login(){
    this.http.post("http://localhost:8081/login/request-login", this.login).subscribe((res:any)=>{
      if(res==true){
        this.router.navigate(["/view-all-book"])
      }else{
        alert("Incorrect Details!")
      }
    })    
  }
}
