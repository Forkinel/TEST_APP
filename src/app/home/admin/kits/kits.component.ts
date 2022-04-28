import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatTableDataSource, MatSort, MatPaginatorModule, MatPaginator } from "@angular/material";
import { UserService } from 'src/app/services/user.service';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../core';
@Component({
  selector: 'app-kits',
  templateUrl: './kits.component.html',
  styleUrls: ['./kits.component.css']
})
export class KitsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['KitName', 'IsActive', 'actionButtons'];
  selectedKitID: number = null;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<KitModel>();

  constructor(private loaderService: LoaderService,  private userService: UserService, private http: HttpClient,private toastr: ToastrService) { }

  dataItemsCount: number = 0;

  ngOnInit() {
   this.GetAllKits();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  GetAllKits(){

    this.http.get<rtnObject>(this.userService.BaseURI + '/Kits/GetAllKits').subscribe(rtnData => {
      //debugger
      if(rtnData.success)
      {
        this.dataSource.data = rtnData.data  as unknown as KitModel[];     
      }
      else
      {
          this.toastr.error(rtnData.responseText, 'Error');
      }            
      
  });

  }

// called when a user in saved in the user-details component
  parentEvent_CloseDetails(msg){ 
    this.GetAllKits();
    this.CloseDetails();
  }

  CloseDetails() {
    this.selectedKitID = null;
    this.displayedColumns =  ['KitName','IsActive', 'actionButtons'];
  }

  AddNewKit() {
    this.selectedKitID = 0;
    this.displayedColumns =  ['KitName', 'actionButtons'];
  }

  GetKitDetails(id) {
    this.selectedKitID = id;
    this.displayedColumns = ['KitName', 'actionButtons'];
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

export interface KitModel {
  ID: number;
  KitName: string;  
  EmailAddresses : string;
  IsWeekly: boolean;
  IsActive: boolean;

  
}