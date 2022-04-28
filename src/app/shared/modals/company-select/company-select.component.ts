import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { UserService } from 'src/app/services/user.service';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.css']
})
export class CompanySelectComponent implements OnInit {

  companies : number[];
  companyList : CompanyModel[];

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService, private userService: UserService,private dialogRef: MatDialogRef<CompanySelectComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.companies = data;
  
  }

  ngOnInit(){
    this.GetCompanyNames();
  }


  GetCompanyNames(){

    var bodyObj = {
      "IDs": this.companies
    };

    debugger;

    this.http.post<rtnObject>(this.userService.BaseURI + '/Companies/GetCompanyNames', bodyObj).subscribe(rtnData => {
      //debugger
      if (rtnData.success) {
        debugger;
        this.companyList = rtnData.data;
      }
      else {
        this.toastr.error(rtnData.responseText, 'Error');
      }

    });

  }

  SelectCompany(id){

    this.router.navigate(['home/customer/orders/create-order/', id]);
    this.dialogRef.close();
  
  }
  
  save() {
    this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }

}

export interface CompanyModel
{
    ID : number;
    IsActive :boolean;
    Name :string ;     
    
}



export interface rtnObject {

  success: boolean;
  responseText: string;
  data: any;
}

