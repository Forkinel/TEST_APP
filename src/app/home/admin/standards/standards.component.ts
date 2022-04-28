import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatTableDataSource, MatSort, MatPaginatorModule, MatPaginator } from "@angular/material";
import { UserService } from 'src/app/services/user.service';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../core';
@Component({
  selector: 'app-standards',
  templateUrl: './standards.component.html',
  styleUrls: ['./standards.component.css']
})
export class StandardsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['StandardName', 'IsActive', 'actionButtons'];
  selectedStandardID: number = null;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<StandardModel>();
  constructor(private loaderService: LoaderService,   private userService: UserService, private http: HttpClient,private toastr: ToastrService) { }

  dataItemsCount: number = 0;

  ngOnInit() {

   this.GetAllStandards();

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public GetAllStandards (){

      this.http.get<rtnObject>(this.userService.BaseURI + '/Standards/GetAllStandards').subscribe(rtnData => {
        //debugger
        if(rtnData.success)
        {
          this.dataSource.data = rtnData.data;                
        }
        else
        {
            this.toastr.error(rtnData.responseText, 'Error');
        }            
        
     });

  }

// called when a user in saved in the user-details component
  parentEvent_CloseDetails(msg){ 
    this.GetAllStandards();
    this.CloseDetails();
  }

  public CloseDetails() {
    this.selectedStandardID = null;
    this.displayedColumns =  ['StandardName','IsActive', 'actionButtons'];
  }

  public AddNewStandard() {
    this.selectedStandardID = 0;
    this.displayedColumns =  ['StandardName', 'actionButtons'];
  }

  public GetStandardDetails(id) {
    this.selectedStandardID = id;
    this.displayedColumns = ['StandardName', 'actionButtons'];
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }



}

// put in a generic area so all areas can use this object 
export interface rtnObject{

  success: boolean;
  responseText : string;
  data : any;
}

export interface StandardModel {
  ID: number;
  StandardName: string;  
  IsActive: boolean;
}

