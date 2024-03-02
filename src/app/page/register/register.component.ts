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

export class RegisterComponent implements OnInit{

  private http;
  public countryList:any;
  public selectedCountry:any;
  public selectedCountryCode:any;
  public userObj = {
    forstName:null,
    lastName:null,
    userName:null,
    email:null,
    address:null,
    address2:null,
    country:null,
    phoneNummber:null
  }

  constructor(private httpClient:HttpClient){
    this.http = httpClient
  }
  ngOnInit(): void {
      this.loadCountries()
  }

  loadCountries(){
    let api ="https://restcountries.com/v3.1/all";
    this.http.get(api).subscribe(res =>{
      this.countryList=res;
    });
  }


  setSlectodCountry(country:any){
    console.log(country.name.common);
    this.selectedCountry=country.name.common;
    this.selectedCountryCode=country.idd.root+""+country.idd.suffixes[0]+" ";
    console.log(this.selectedCountryCode);

  }
  submitForm(){
    console.log(this.userObj);
    
  }

}
