import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { CompanySelectComponent } from 'src/app/shared/modals/company-select/company-select.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  usersCompanyID: any = 1;
  companies : number[];

  constructor(private router : Router, private userService : UserService, private dialog: MatDialog) { }

  ngOnInit() {
  }
  
  async CreateNewOrder(){
  
    var userCompanies = await this.userService.getUserCompanies();
    debugger;    
    var userCompaniesCounter = userCompanies.companies.length;
    this.companies = userCompanies.companies;
    debugger;

    if(userCompaniesCounter == 1)
    {
      alert('only has 1 company');
      this.router.navigate([this.router.url + '/create-order/', userCompanies.companies[0]]);
    }
    else
    {
      alert('has multiple companies show modal and allow selection');
      this.openDialog() ;
    }

    debugger;   
   
    // var currentUserID = this.userService.getCurrentUserID().ID

    //this.router.navigate([this.router.url + '/create-order/', this.usersCompanyID]);

  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data =  this.companies;

    this.dialog.open(CompanySelectComponent, dialogConfig);
}

}
