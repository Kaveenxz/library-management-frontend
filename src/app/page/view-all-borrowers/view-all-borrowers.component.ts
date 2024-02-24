import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import  Swal from 'sweetalert2';


@Component({
  selector: 'app-view-all-borrowers',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './view-all-borrowers.component.html',
  styleUrl: './view-all-borrowers.component.css'
})
export class ViewAllBorrowersComponent implements OnInit{
  private http;
  public borroweList:any = {};
  public selectedBorrower:any;

  constructor(private httpClient:HttpClient){
    this.http = httpClient;
  }
  ngOnInit(): void {
      this.loadBorrowers();
  }
  loadBorrowers(){
    this.http.get('http://localhost:8081/borrower/get').subscribe((data) =>{
      this.borroweList=data;
      console.log(this.borroweList);
    })
  }

  deleteBorrowers() {
    let api = "http://localhost:8081/borrower/"+this.selectedBorrower.id;
    this.http.delete(api, { responseType: 'text' }).subscribe(
      (response: string) => {
        this.loadBorrowers();
        Swal.fire({
          title: "Good job!",
          text: `${this.selectedBorrower.Fname} borrower is deleted`,
          icon: "success"
        });
        this.selectedBorrower = null;

      }
    )
  }
  
  setSelecteBorrower(borrower:any){
    this.selectedBorrower = borrower;
  }

  saveBorrower(){
    let postApi = "http://localhost:8081/borrower/add"
    this.http.post(postApi, this.selectedBorrower).subscribe(data =>{
      console.log("saved!");
      this.loadBorrowers();
      Swal.fire({
        title: "Good job! Updated book",
        text: `${this.selectedBorrower.Fname} borrower is Updated`,
        icon: "success"
      });
      this.selectedBorrower={};
    })
  }
}
