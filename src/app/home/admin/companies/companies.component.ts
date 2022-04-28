import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatTableDataSource, MatSort, MatPaginatorModule, MatPaginator } from "@angular/material";
import { UserService } from 'src/app/services/user.service';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoaderService } from '../../../core';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['Name', 'IsActive', 'actionButtons'];
  selectedCompanyID: number = null;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<CompanyModel>();

  constructor(private loaderService: LoaderService,  private userService: UserService, private http: HttpClient,private toastr: ToastrService, private router: Router) { }

  dataItemsCount: number = 0;

  ngOnInit() {

   this.GetAllCompanies();

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

public GetAllCompanies (){

  this.http.get<rtnObject>(this.userService.BaseURI + '/Companies/GetAllCompanies').subscribe(rtnData => {
    //debugger
    if(rtnData.success)
    {
      this.dataSource.data = rtnData.data as unknown as CompanyModel[];                
    }
    else
    {
        this.toastr.error(rtnData.responseText, 'Error');
    }            
    
});

}

// called when a user in saved in the user-details component
  parentEvent_CloseDetails(msg){ 
    this.GetAllCompanies();
    this.CloseDetails();
  }

  public CloseDetails() {
    this.selectedCompanyID = null;
    this.displayedColumns =  ['Name','IsActive', 'actionButtons'];
  }

  public AddNewCompany() {
    this.selectedCompanyID = 0;
    this.displayedColumns =  ['Name', 'actionButtons'];
  }

  public GetCompanyDetails(id) {
    this.selectedCompanyID = id;
    this.displayedColumns = ['Name', 'actionButtons'];
  }

  public CreateOrder(id){
    debugger;
    this.router.navigate(['home/create-order/',id]);

  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  CreateNewOrder(id){

    this.router.navigate(['home/customer/orders/create-order/', id]);

  }

}

// put in a generic area so all areas can use this object 
export interface rtnObject{

  success: boolean;
  responseText : string;
  data : any;
}

export interface CompanyModel {
  ID: number;
  Name: string;  
  IsActive: boolean;
}