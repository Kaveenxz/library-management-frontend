import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {

  private http;
  public countryList: any;
  public selectedCountryCode: any;
  public isExistUser: any;
  public selectedCountry:any="Country";
  public userObj = {
    firstName: null,
    lasttName: null,
    userName: null,
    email: null,
    address: null,
    address2: null,
    country: null,
    phoneNummber: null
  }

  constructor(private httpClient: HttpClient) {
    this.http = httpClient
  }
  ngOnInit(): void {
    this.loadCountries()
  }

  loadCountries() {
    let api ="https://restcountries.com/v3.1/all";
    this.http.get(api).subscribe(res =>{
      this.countryList=res;
    });
  }

  setSlectodCountry(country: any) {
    console.log(country.name.common);
    this.selectedCountry=country.name.common;
    this.selectedCountryCode=country.idd.root+""+country.idd.suffixes[0]+" ";
    console.log(this.selectedCountryCode);
  }
  submitForm() {
    console.log(this.userObj);
    this.http.get(`http://localhost:8081/user/is-Exist-user/${this.userObj.userName}`).subscribe(data => {
      this.isExistUser = data;
      this.registerUser(this.isExistUser);
    })
  }

  registerUser(isExistUser: any) {
      if(!isExistUser==true){
        this.http.post("http://localhost:8081/user/add-user", this.userObj).subscribe(data =>{

        Swal.fire({
          title:"Sucsess!",
          text:`${this.userObj.userName} has been Registerd`,
          icon:"success"
        })
      })
      }else{
        Swal.fire({
          title:"Cant Register this user!",
          text:`${this.userObj.userName} has already taken`,
          icon:"error"
        })
      }
  }


}
