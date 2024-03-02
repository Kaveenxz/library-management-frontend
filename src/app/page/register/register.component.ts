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
  public selectedCountry: any;
  public selectedCountryCode: any;
  public isExistUser: any;

  public userObj = {
    firstName: null,
    lastName: null,
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
    let api = "https://restcountries.com/v3.1/all";
    this.http.get(api).subscribe(res => {
      this.countryList = res;
      console.log(res);

    })
  }

  setSlectodCountry(country: any) {
    console.log(country);
    this.selectedCountry = country
  }
  submitForm() {
    console.log(this.userObj);
    this.http.get(`http://localhost:8081/user/is-Exist-user/${this.userObj.userName}`).subscribe(data => {
      this.isExistUser = data;
      this.registerUser(this.isExistUser);
    })
  }

  registerUser(isExistUser: any) {
      
  }


}
